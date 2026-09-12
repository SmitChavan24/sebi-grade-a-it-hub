import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=fileURLToPath(new URL('../',import.meta.url));
const read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
test('all 180 days have four hours, valid lessons and correct totals',()=>{
 const plan=read('data/roadmap.json'),notes=read('data/notes/index.json').notes;
 const ids=new Set(notes.map(n=>n.id)),subjects=new Set(read('data/syllabus.json').subjects.map(s=>s.id));
 const days=plan.weeks.flatMap(w=>w.days);assert.equal(days.length,180);let count=0,mins=0;
 days.forEach((d,i)=>{assert.equal(d.n,i+1);assert.equal(d.tasks.reduce((s,t)=>s+t.m,0),240);for(const t of d.tasks){assert.ok(subjects.has(t.s),t.s);if(t.n)assert.ok(ids.has(t.n),t.n);mins+=t.m;count++;}});
 assert.equal(count,plan.totalTasks);assert.equal(mins/60,plan.totalHours);
 for(const n of notes)assert.ok(fs.statSync(path.join(root,'data/notes',n.id+'.md')).size>150,n.id);
 for(const s of read('data/syllabus.json').subjects)for(const t of s.topics)assert.ok(ids.has(t.note),t.note);
 const scheduled=new Set(days.flatMap(d=>d.tasks.map(t=>t.n)));
 for(const id of ['it-shell','it-data-python','it-data-r','it-warehouse','it-prog-cpp','it-strings','engd-essay'])assert.ok(scheduled.has(id),id);
});
test('exam baseline reflects the verified IT format and weights',()=>{
 const s=read('data/syllabus.json');assert.equal(s.phases[1].papers[1].minutes,180);
 for(const rows of Object.values(s.weights))assert.equal(rows.reduce((a,r)=>a+r[1],0),100);
 assert.ok(s.source.url.startsWith('https://www.sebi.gov.in/'));
 assert.ok(!JSON.stringify(s.phases).includes('objective + descriptive'));
});
test('question bank has unique IDs/options and complete explanations',()=>{
 const qs=read('data/mcq/questions.json').questions;assert.ok(qs.length>=100);assert.equal(new Set(qs.map(q=>q.id)).size,qs.length);
 for(const q of qs){assert.equal(q.o.length,4);assert.equal(new Set(q.o).size,4,q.id);assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<4);assert.ok(q.e.length>25,q.id);}
 const cards=read('data/flashcards.json').cards;assert.equal(new Set(cards.map(c=>c.id)).size,cards.length);assert.ok(cards.length>=90);
});
test('included books exist with correct file signatures and attribution',()=>{
 const books=read('library/library.json').books;assert.ok(books.length>=6);
 for(const b of books){const data=fs.readFileSync(path.join(root,b.file));assert.ok(data.length>1000,b.file);assert.ok(b.license);if(b.file.endsWith('.pdf'))assert.equal(data.subarray(0,5).toString(),'%PDF-');if(b.file.endsWith('.docx'))assert.equal(data.subarray(0,2).toString(),'PK');}
});
test('all app modules parse',()=>{
 const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
 for(const f of walk(path.join(root,'assets/js')).filter(f=>f.endsWith('.js')))execFileSync(process.execPath,['--input-type=module','--check'],{input:fs.readFileSync(f),stdio:'pipe'});
});
