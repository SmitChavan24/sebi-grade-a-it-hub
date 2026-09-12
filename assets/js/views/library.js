import { el, toast, loadScript, pickFile, md } from '../util.js';
import { S } from '../store.js';
import { loadLibrary } from '../data.js';

function savedFile(key,file) {
  return new Promise((resolve,reject)=>{
    const request=indexedDB.open('sebi-book-files',1);
    request.onupgradeneeded=()=>request.result.createObjectStore('files');
    request.onerror=()=>reject(request.error);
    request.onsuccess=()=>{
      const db=request.result,tx=db.transaction('files',file?'readwrite':'readonly'),store=tx.objectStore('files');
      const result=file?store.put(file,key):store.get(key);
      tx.oncomplete=()=>{resolve(result.result);db.close();};
      tx.onerror=tx.onabort=()=>{reject(tx.error);db.close();};
    };
  });
}

export default async function library(root,ctx={}) {
  const shelf=await loadLibrary();let dispose=()=>{};
  root.append(el('div',{class:'page-head'},el('div',{class:'grow'},el('h1',{},'Your study library'),el('p',{class:'sub'},'Read, bookmark and take notes. Your next session starts where you stopped.')),el('button',{class:'btn primary',onclick:async()=>{const file=await pickFile('.pdf,.docx,.txt,.md');if(file)local(file);}},'Open from device')));
  const stage=el('div');root.append(stage);
  const observer=new MutationObserver(()=>{if(!root.isConnected){dispose();observer.disconnect();}});observer.observe(document.body,{childList:true,subtree:true});
  async function local(file){
    const ext=file.name.split('.').pop().toLowerCase();
    if(!['pdf','docx','txt','md'].includes(ext)){toast('Use PDF, DOCX, TXT or Markdown. Convert older .doc files first.',5000);return;}
    const key=`local::${file.name}::${file.size}::${file.lastModified}`;
    try{if(file.size<=30*1024*1024)await savedFile(key,file);else toast('Pick this large file again next time to resume.',5000);}catch{toast('File storage unavailable; pick this file again next time.',4000);}
    await open(file,key,file.name,ext);
  }
  async function repo(book){
    try{
      if(!book.file){
        await drawShelf();
        toast('This title is available from its free source link below.',5000);
        return;
      }
      stage.textContent='Opening '+book.title+'…';
      const response=await fetch(book.file);if(!response.ok)throw new Error('Book unavailable. Reconnect and try again.');
      await open(await response.blob(),'repo::'+book.file,book.title,book.file.split('.').pop(),book.file);
    }catch(e){await drawShelf();toast(e.message,5000);}
  }
  async function drawShelf(){
    dispose();dispose=()=>{};stage.replaceChildren();
    const drop=el('div',{class:'drop',style:'margin-bottom:20px'},el('b',{},'Your books, wherever you study'),el('p',{class:'small muted',style:'margin:6px 0 0'},'Drop a PDF, DOCX, TXT or Markdown file here. Device files stay in this browser. Older .doc files need conversion.'));
    drop.ondragover=e=>{e.preventDefault();drop.classList.add('hot');};drop.ondragleave=()=>drop.classList.remove('hot');
    drop.ondrop=e=>{e.preventDefault();if(e.dataTransfer.files[0])local(e.dataTransfer.files[0]);};stage.append(drop);
    const recents=Object.entries(S.readerAll).sort((a,b)=>b[1].updated-a[1].updated).slice(0,8);
    if(recents.length){
      const grid=el('div',{class:'note-list'});
      for(const [key,st]of recents)grid.append(el('button',{class:'note-card',onclick:async()=>{
        if(st.repo){const book=shelf.books.find(b=>b.file===st.repo);if(book)return repo(book);}
        try{const file=await savedFile(key);if(file)return open(file,key,st.name,st.type);}catch{}
        toast('Pick this file again using Open from device. Your bookmarks are preserved.',5000);
      }},el('h4',{},st.name),el('p',{},st.total?`Page ${st.page} of ${st.total}`:'Continue reading')));
      stage.append(el('section',{class:'card',style:'margin-bottom:18px'},el('h2',{},'Continue reading'),grid));
    }
    const grid=el('div',{class:'note-list'});
    for(const b of shelf.books){const actions=[];if(b.file){actions.push(el('button',{class:'btn sm primary',onclick:()=>repo(b)},'Read here'),el('a',{class:'btn sm',href:b.file,download:''},'Download'));}if(b.source)actions.push(el('a',{href:b.source,target:'_blank',rel:'noopener',class:'link-btn'},b.file?'Source & licence':'Read online'));grid.append(el('div',{class:'note-card'},el('h4',{},b.title),el('p',{},b.desc||b.author||''),el('p',{class:'xsmall muted'},b.license||''),el('div',{class:'btn-row'},...actions)));}
    stage.append(el('section',{class:'card',style:'margin-bottom:18px'},el('h2',{},'Included books and guides'),el('p',{class:'small muted'},'Open each PDF once while connected to save it offline. The app saves notes, the DOCX guide and reader tools automatically.'),grid));
    for(const group of shelf.links||[])stage.append(el('section',{class:'card',style:'margin-bottom:18px'},el('h2',{},group.group),...group.items.map(item=>el('p',{class:'small'},el('a',{href:item.u,target:'_blank',rel:'noopener'},item.t),el('br'),item.d))));
  }
  async function open(blob,key,title,ext,repoPath){
    dispose();dispose=()=>{};stage.replaceChildren();
    S.setReader(key,{name:title,type:ext,...(repoPath?{repo:repoPath}:{})});
    const bar=el('div',{class:'reader-bar'},el('button',{class:'btn sm',onclick:()=>{history.replaceState(null,'','#/library');drawShelf();}},'← Library'),el('strong',{class:'fname'},title));
    const body=el('div',{class:'reader-stage'});stage.append(el('div',{class:'reader'},bar,body));
    const notes=el('textarea',{class:'inp','aria-label':'Book notes',placeholder:'Your notes for this book…'});notes.value=S.readerState(key).note||'';notes.oninput=()=>S.setReader(key,{note:notes.value});
    stage.append(el('div',{class:'card',style:'margin-top:16px'},el('h2',{},'Your book notes'),notes));
    try{
      if(ext==='pdf'){
        body.textContent='Loading PDF…';const pdfjs=await import('../../vendor/pdf.mjs');
        const vendor=new URL('../../vendor/',import.meta.url).href;pdfjs.GlobalWorkerOptions.workerSrc=vendor+'pdf.worker.mjs';
        const loading=pdfjs.getDocument({data:await blob.arrayBuffer(),isEvalSupported:false,cMapUrl:vendor+'cmaps/',cMapPacked:true,standardFontDataUrl:vendor+'standard_fonts/',wasmUrl:vendor+'wasm/'});
        let alive=true;dispose=()=>{alive=false;loading.destroy();};const doc=await loading.promise;if(!alive)return;
        let page=Math.max(1,Math.min(doc.numPages,S.readerState(key).page||1)),zoom=0,sequence=0;
        const input=el('input',{class:'inp',type:'number',min:1,max:doc.numPages,'aria-label':'PDF page',style:'width:70px'}),count=el('span',{class:'small'},'/ '+doc.numPages),marks=el('select',{class:'sel sm','aria-label':'Bookmarked pages'});
        const prev=el('button',{class:'btn sm','aria-label':'Previous page'},'‹'),next=el('button',{class:'btn sm','aria-label':'Next page'},'›'),mark=el('button',{class:'btn sm'},'Bookmark'),fit=el('button',{class:'btn sm'},'Fit'),minus=el('button',{class:'btn sm','aria-label':'Zoom out'},'−'),plus=el('button',{class:'btn sm','aria-label':'Zoom in'},'+');
        bar.append(prev,input,count,next,minus,fit,plus,mark,marks);
        const sync=()=>{input.value=page;prev.disabled=page===1;next.disabled=page===doc.numPages;const bm=S.readerState(key).bookmarks||[];mark.textContent=bm.includes(page)?'Remove bookmark':'Bookmark';marks.replaceChildren(el('option',{value:''},`${bm.length} bookmarks`),...bm.slice().sort((a,b)=>a-b).map(p=>el('option',{value:p},'Page '+p)));};
        async function draw(){
          const current=++sequence;sync();S.setReader(key,{page,total:doc.numPages});
          try{const p=await doc.getPage(page);if(!alive||current!==sequence)return;
            const vp=p.getViewport({scale:zoom||Math.max(.25,Math.min(2,(body.clientWidth-32)/p.getViewport({scale:1}).width))});
            const ratio=Math.min(devicePixelRatio||1,2),canvas=el('canvas',{'aria-label':`${title}, page ${page}`});canvas.width=Math.floor(vp.width*ratio);canvas.height=Math.floor(vp.height*ratio);canvas.style.width=vp.width+'px';canvas.style.height=vp.height+'px';
            await p.render({canvasContext:canvas.getContext('2d'),viewport:vp,transform:[ratio,0,0,ratio,0,0]}).promise;if(alive&&current===sequence){body.replaceChildren(canvas);body.scrollTop=0;}
          }catch(e){if(alive&&current===sequence)body.textContent='Could not render page: '+e.message;}
        }
        const go=n=>{page=Math.max(1,Math.min(doc.numPages,Math.trunc(n)||1));draw();};prev.onclick=()=>go(page-1);next.onclick=()=>go(page+1);input.onchange=()=>go(+input.value);
        minus.onclick=()=>{zoom=Math.max(.3,(zoom||1)/1.2);draw();};plus.onclick=()=>{zoom=Math.min(3,(zoom||1)*1.2);draw();};fit.onclick=()=>{zoom=0;draw();};
        mark.onclick=()=>{const bm=S.readerState(key).bookmarks||[];S.setReader(key,{bookmarks:bm.includes(page)?bm.filter(p=>p!==page):[...bm,page]});sync();};marks.onchange=()=>{if(marks.value)go(+marks.value);};
        const handler=e=>{if(e.target.matches('input,textarea,select,button'))return;if(e.key==='ArrowRight'){e.preventDefault();go(page+1);}if(e.key==='ArrowLeft'){e.preventDefault();go(page-1);}};document.addEventListener('keydown',handler);
        dispose=()=>{alive=false;sequence++;document.removeEventListener('keydown',handler);loading.destroy();};await draw();
      }else{
        const page=el('article',{class:'docx-page'});
        if(ext==='docx'){await loadScript('assets/vendor/mammoth.min.js');const result=await window.mammoth.convertToHtml({arrayBuffer:await blob.arrayBuffer()});page.innerHTML=window.DOMPurify.sanitize(result.value,{USE_PROFILES:{html:true}});}
        else if(ext==='md')page.innerHTML=md(await blob.text());else page.append(el('pre',{style:'white-space:pre-wrap'},await blob.text()));
        body.replaceChildren(page);body.scrollTop=S.readerState(key).scrollY||0;body.onscroll=()=>S.setReader(key,{scrollY:body.scrollTop,page:1,total:1});
      }
    }catch(e){body.textContent='Could not open this document: '+e.message;}
  }
  await drawShelf();const target=ctx.params?.[0];if(target){const book=shelf.books.find(b=>b.id===target||b.file===target);if(book)await repo(book);}
}
