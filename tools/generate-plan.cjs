const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const syl=JSON.parse(fs.readFileSync(path.join(root,'data/syllabus.json'),'utf8'));
const idx=JSON.parse(fs.readFileSync(path.join(root,'data/notes/index.json'),'utf8'));
const byNote=Object.fromEntries(idx.notes.map(n=>[n.id,n]));
const groups=[
 ['Programming foundations',['it-prog-c','it-prog-pointers','it-prog-cpp','it-prog-oop','it-prog-java','it-prog-output']],
 ['Data structures',['it-ds-complexity','it-ds-linear','it-ds-trees','it-ds-hashing','it-ds-graphs','it-strings']],
 ['Algorithm design',['it-ds-sorting','it-ds-paradigms','it-ds-complexity','it-ds-graphs','it-strings','it-prog-output']],
 ['Database foundations',['it-dbms-model','it-dbms-relational','it-dbms-normalisation','it-dbms-indexing','it-dbms-transactions','it-dbms-concurrency']],
 ['SQL and data models',['it-dbms-sql','it-dbms-sql-adv','it-dbms-relational','it-dbms-nosql','it-warehouse','it-dbms-sql']],
 ['Python and R analytics',['it-prog-python','it-data-python','it-data-r','it-data-python','it-warehouse','it-strings']],
 ['Computer networks',['it-cn-models','it-cn-physical','it-cn-datalink','it-cn-mac','it-cn-ip','it-cn-routing']],
 ['Protocols and security',['it-cn-transport','it-cn-application','it-cn-security','it-sec-fundamentals','it-sec-auth','it-sec-attacks']],
 ['Security and shell',['it-sec-crypto','it-sec-pki','it-sec-defence','it-sec-standards','it-shell','it-shell']],
 ['Programming fluency',['it-prog-c','it-prog-cpp','it-prog-java','it-prog-python','it-prog-oop','it-prog-output']],
 ['Phase II algorithms and structures',['it-ds-linear','it-ds-trees','it-ds-sorting','it-ds-paradigms','it-ds-hashing','it-strings']],
 ['Consolidate the core syllabus',['it-dbms-sql-adv','it-data-python','it-data-r','it-warehouse','it-shell','it-sec-fundamentals']]
];
const phaseMeta={build:{name:'Weeks 1–12 · Core learning',c:'acc'},rev1:{name:'Weeks 13–18 · Recall and code tracing',c:'pur'},rev2:{name:'Weeks 19–24 · Mocks and weak areas',c:'warn'},final:{name:'Weeks 25–26 · Final consolidation',c:'ok'}};
const p1=syl.subjects.filter(s=>['ga','qa','reas','eng'].includes(s.id)).map(s=>({id:s.id,notes:[...new Set(s.topics.map(t=>t.note))],i:0}));
const writing=['engd-essay','engd-precis','engd-comprehension','engd-essay-topics'];
const ca=['Read one dated official SEBI release; save source and three takeaways','Read a dated RBI release and explain its terms','Read an official investor-education page and make five recall prompts','Review a recent Budget or Economic Survey section','Update your current-affairs log; distinguish facts from opinion','Recall this week’s entries without looking'];
const task=(t,s,m,k,n,url)=>({t,s,m,k,...(n?{n}:{}),...(url?{url}:{})});
const weeks=[];
for(let w=1;w<=26;w++){
 const phase=w<=12?'build':w<=18?'rev1':w<=24?'rev2':'final';
 const group=groups[(w-1)%groups.length];
 const days=[];
 for(let d=0;d<7;d++){
  const n=(w-1)*7+d+1;if(n>180)break;
  let tasks;
  if(d===6){
   if(w>=19&&w%2===1)tasks=[task('Phase II IT simulation: objective code/logic questions, 180 minutes. Use an external full mock or repeated original practice sets.','it-ds',180,'test',null,'#/practice'),task('Analyse every wrong/skipped answer; log result and top three gaps','it-ds',60,'revise',null,'#/mocks')];
   else tasks=[task('Phase I Paper 1 simulation: follow the current handout question count','ga',60,'test',null,'#/practice'),task('Phase I IT simulation: 40-minute objective set','it-prog',40,'test',null,'#/practice'),task('Log mock scores and classify errors: knowledge, reading, calculation or time','it-prog',60,'revise',null,'#/mocks'),task('Clear two highest-priority unfinished tasks from this week','it-ds',35,'revise',null,'#/revision'),task('Review this week’s current-affairs notes from memory','ga',25,'ca',null,'#/currentaffairs'),task('Plan next week and export a progress backup','ga',20,'revise',null,'#/settings')];
  }else{
   const note=group[1][d],meta=byNote[note];const p=p1[(n-1)%p1.length],pn=p.notes[p.i++%p.notes.length];
   tasks=[
    task((phase==='build'?'Learn: ':phase==='rev1'?'Recall and apply: ':'Repair weak points: ')+meta.title+'. Read the lesson, work examples, then explain it without notes.',meta.subject,90,'learn',note),
    task('Solve 10–20 original practice questions; trace all variables before checking the explanation',meta.subject,35,'practice',null,'#/practice?s='+meta.subject),
    task('Common paper: '+byNote[pn].title+'. Work examples and record mistakes.',p.id,40,'practice',pn),
    task('English: one passage or grammar drill; explain each answer','eng',20,'practice',['eng-comprehension','eng-grammar','eng-cloze','eng-parajumble','eng-vocab'][d%5]),
    task(ca[d],'ga',20,'ca','ga-current-affairs','#/currentaffairs'),
    task('Recall yesterday’s lesson and clear due flashcards; revisit weak topics after 1, 3 and 7 days',meta.subject,20,'revise',null,'#/flashcards/due'),
    task('English drafting: plan, type or edit one section of an answer','engd',15,'write',writing[n%4])
   ];
   if(w>=13&&d===5){tasks[2]=task('Timed English descriptive session: follow your current handout and review against the writing rubric','engd',60,'test','engd-essay');tasks[0].m=70;}
   if(w>=25){tasks[0].t='Final recall: '+meta.title+'. Use your error log; avoid adding new resources.';tasks[5]=task('Explain one original interview scenario aloud and revise a weak topic','intv',20,'revise','intv-it-questions');}
  }
  days.push({n,dow:d===6?0:d+1,tasks});
 }
 weeks.push({n:w,phase,phaseName:phaseMeta[phase].name,colour:phaseMeta[phase].c,theme:w<=12?group[0]:`${w<=18?'Revision':w<=24?'Mock practice':'Final review'} · ${group[0]}`,days});
}
const tasks=weeks.flatMap(w=>w.days.flatMap(d=>d.tasks));
for(const t of tasks)if(t.n&&!byNote[t.n])throw new Error('Broken roadmap lesson '+t.n);
const plan={title:'SEBI Grade A IT · 180-Day Roadmap',totalDays:180,totalTasks:tasks.length,totalHours:720,generated:'2026-09-12',phases:phaseMeta,note:'Four focused hours per day. Every seventh plan day is a review day, regardless of calendar weekday. Days 1–84 cover the core syllabus; later phases add recall, English drafting and mock analysis. The practice bank is original study material, not a full official mock series. Supplement it with full-length papers. Changing your daily-hours goal changes the tracker target, not these lesson durations. No upcoming exam date is assumed.',weeks};
fs.writeFileSync(path.join(root,'data/roadmap.json'),JSON.stringify(plan,null,2)+'\n');
console.log(`Built ${weeks.length} weeks, 180 days, ${tasks.length} linked tasks.`);
