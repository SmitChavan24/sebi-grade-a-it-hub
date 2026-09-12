const fs=require('node:fs'),path=require('node:path');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const books=[
 {id:'open-data-structures',file:'library/open-data-structures.pdf',title:'Open Data Structures · Java',author:'Pat Morin',desc:'Full textbook: arrays, lists, hashing, trees, heaps and graphs. Begin with chapters 1–3, 5–6 and 10.',source:'https://opendatastructures.org/',url:'https://opendatastructures.org/ods-java.pdf',license:'Creative Commons Attribution · unmodified original'},
 {id:'think-python',file:'library/think-python.pdf',title:'Think Python · Second edition',author:'Allen B. Downey',desc:'Python foundations, functions, collections and objects. A full introductory book for your daily reading.',source:'https://greenteapress.com/wp/think-python-2e/',url:'https://greenteapress.com/thinkpython2/thinkpython2.pdf',license:'CC BY-NC 3.0 · unmodified · noncommercial study use'},
 {id:'algorithms',file:'library/algorithms.pdf',title:'Algorithms',author:'Jeff Erickson',desc:'Full textbook for deeper practice in recursion, backtracking, greedy algorithms and dynamic programming.',source:'https://jeffe.cs.illinois.edu/teaching/algorithms/',url:'https://jeffe.cs.illinois.edu/teaching/algorithms/book/Algorithms-JeffE.pdf',license:'CC BY 4.0 · unmodified original'}
];
(async()=>{
 for(const b of books){
  const dest=path.join(root,b.file);
  if(!fs.existsSync(dest)){
   const bytes=execFileSync('curl.exe',['-f','-sS','-L','--connect-timeout','15','--max-time','60',b.url],{maxBuffer:50*1024*1024,timeout:65000});if(bytes.subarray(0,5).toString()!=='%PDF-')throw new Error('Not a PDF: '+b.title);
   fs.writeFileSync(dest,bytes);
  }
  console.log(b.title+': '+Math.round(fs.statSync(dest).size/1024)+' KB');
 }
 const shelf=JSON.parse(fs.readFileSync(path.join(root,'library/library.json'),'utf8'));
 shelf.books=[{id:'study-handbook',file:'library/study-handbook.pdf',title:'Your 180-day study handbook',desc:'Complete daily plan, weekly targets and study routines. Printable PDF.',license:'Original study guide · generated 12 September 2026'},{id:'study-handbook-word',file:'library/study-handbook.docx',title:'Your 180-day handbook · Word',desc:'Editable DOCX version. Read here or download for personal planning.',license:'Original study guide'},{id:'complete-notes',file:'library/complete-study-notes.pdf',title:'Complete study notes · offline collection',desc:'All topic notes in one downloadable reference. Includes labelled supplementary material.',license:'Original study notes · technical and dated policy summaries'},...books.map(({url,...b})=>b)];
 shelf.links=shelf.links.map(g=>({...g,group:g.group.replace(' (your highest-value block)','')}));
 fs.writeFileSync(path.join(root,'library/library.json'),JSON.stringify(shelf,null,2)+'\n');
})().catch(e=>{console.error(e.message);process.exitCode=1;});
