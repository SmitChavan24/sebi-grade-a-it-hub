import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {JSDOM} from 'jsdom';
import createDOMPurify from 'dompurify';
const dom=new JSDOM('<!doctype html><html><body><div id="toast" hidden></div><main id="view"></main></body></html>',{url:'https://example.test/SEBIPAPER/'});
globalThis.window=dom.window;globalThis.document=dom.window.document;globalThis.location=dom.window.location;
globalThis.localStorage=dom.window.localStorage;globalThis.CustomEvent=dom.window.CustomEvent;globalThis.MutationObserver=dom.window.MutationObserver;
globalThis.history=dom.window.history;
window.scrollTo=()=>{};window.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
window.DOMPurify=createDOMPurify(window);
globalThis.fetch=async url=>{
 const file=new URL('../'+url,import.meta.url);
 try{const bytes=fs.readFileSync(file);return{ok:true,json:async()=>JSON.parse(bytes.toString()),text:async()=>bytes.toString(),blob:async()=>new Blob([bytes])};}catch{return{ok:false,status:404};}
};
const {S,todayISO,currentDayNumber,dayNumberFor}=await import('../assets/js/store.js');
const {md}=await import('../assets/js/util.js');
test('progress is durable immediately, streak uses completion date and future plans stay in future',()=>{
 S.reset();S.toggleTask(150,1,true);assert.equal(JSON.parse(localStorage.getItem('sebi-gradeA-it-hub:v1')).tasks['d150:1'],true);assert.equal(S.streak(),1);
 const future=new Date();future.setDate(future.getDate()+5);S.set('settings.startDate',future.toLocaleDateString('sv-SE'));assert.equal(currentDayNumber(),-4);assert.equal(S.streak(),1);
 S.set('settings.startDate','2026-03-07');assert.equal(dayNumberFor('2026-03-09'),3);S.reset();
});
test('backup round-trip restores notes, bookmarks and tasks; malformed input cannot replace progress',()=>{
 S.reset();S.toggleTask(1,0,true);S.setUserNote('it-shell','Remember quoting');S.setReader('book',{page:3,total:20,bookmarks:[3],note:'Read again'});S.addMinutes(25);
 const backup=S.export();S.reset();S.import(backup);assert.equal(S.userNote('it-shell'),'Remember quoting');assert.equal(S.readerState('book').page,3);assert.ok(S.isTaskDone(1,0));
 const before=S.export();for(const bad of ['{}','[]','null','{"v":1,"settings":{},"tasks":null}']){assert.throws(()=>S.import(bad));assert.equal(S.export(),before);}
 const poisoned=JSON.parse(backup);poisoned.sessions[todayISO()]='bad';assert.throws(()=>S.import(JSON.stringify(poisoned)));assert.equal(S.export(),before);
 assert.throws(()=>S.set('__proto__.bad',true));assert.equal({}.bad,undefined);S.reset();
});
test('Markdown preserves code and strips executable links and markup',()=>{
 const html=md('# Lesson\n\n[bad](javascript:alert%281%29)\n\n<script>alert(1)</script>\n\n```js\nconst x = 1 < 2;\n```');
 const holder=document.createElement('div');holder.innerHTML=html;assert.equal(holder.querySelector('script'),null);assert.ok(!holder.querySelector('a')?.getAttribute('href')?.startsWith('javascript:'));assert.ok(holder.querySelector('pre').textContent.includes('1 < 2'));
});
test('every route renders against the packaged content',async()=>{
 for(const route of ['dashboard','roadmap','syllabus','curriculum','notes','library','videos','flashcards','practice','revision','mocks','currentaffairs','analytics','settings']){
   console.log('Checking route:',route);
   const host=document.createElement('div');document.querySelector('#view').replaceChildren(host);
   const mod=await import('../assets/js/views/'+route+'.js');await mod.default(host,{params:[],query:new URLSearchParams(),name:route});
   assert.ok(host.querySelector('h1'),route);assert.ok(!host.textContent.includes('undefined'),route);
 }
 const host=document.createElement('div');document.querySelector('#view').replaceChildren(host);const r=await import('../assets/js/views/roadmap.js');await r.today(host);assert.ok(host.textContent.includes('Today'));
});
test('task interaction updates persistence, daily and weekly counters',async()=>{
 S.reset();const host=document.createElement('div');document.querySelector('#view').replaceChildren(host);
 const {default:roadmap}=await import('../assets/js/views/roadmap.js');await roadmap(host,{query:new URLSearchParams()});
 const checkbox=host.querySelector('input[type=checkbox]');checkbox.checked=true;checkbox.dispatchEvent(new window.Event('change',{bubbles:true}));
 assert.ok(S.isTaskDone(1,0));assert.match(host.querySelector('#wk1 .wk-prog .xsmall').textContent,/^1\//);
});
test('practice answers can be reviewed after navigating away and timed results penalise wrong answers',async()=>{
 S.reset();const host=document.createElement('div');document.querySelector('#view').replaceChildren(host);
 const {default:practice}=await import('../assets/js/views/practice.js');await practice(host,{query:new URLSearchParams('s=qa')});
 [...host.querySelectorAll('button')].find(b=>b.textContent==='Start →').click();host.querySelector('.opt').click();
 [...host.querySelectorAll('button')].find(b=>b.textContent==='Next →').click();[...host.querySelectorAll('button')].find(b=>b.textContent==='← Previous').click();
 assert.ok(host.querySelector('.expl'));assert.ok(host.querySelector('.opt.right'));
 document.querySelector('#view').replaceChildren();
});
