/* Syllabus & exam pattern + per-topic confidence tracking. */
import { el, esc, pct, toast } from '../util.js';
import { S } from '../store.js';
import { loadSyllabus } from '../data.js';

const STATUS = [
  { v: 'todo',     l: 'Not started', c: '' },
  { v: 'learning', l: 'Learning',    c: 'acc' },
  { v: 'revise',   l: 'Needs revision', c: 'warn' },
  { v: 'done',     l: 'Confident',   c: 'ok' }
];

export default async function syllabus(root) {
  const syl = await loadSyllabus();

  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, 'Syllabus & Exam Pattern'),
      el('p', { class: 'sub' }, `${syl.post} · ${syl.stream} stream`))
  ));

  root.append(el('div', { class: 'card tight', style: 'margin-bottom:18px;border-left:3px solid var(--warn)' },
    el('p', { class: 'small', style: 'margin:0' }, el('b', {}, '⚠ Verify before you rely on it: '), syl.disclaimer)));

  const tabs = el('div', { class: 'tabs' });
  const body = el('div', {});
  const views = {
    pattern: () => drawPattern(syl),
    topics:  () => drawTopics(syl)
  };
  let active = 'pattern';
  const btn = (k, l) => {
    const b = el('button', { class: active === k ? 'on' : '', onclick: () => { active = k; paint(); } }, l);
    return b;
  };
  function paint() {
    tabs.innerHTML = ''; tabs.append(btn('pattern', 'Exam pattern'), btn('topics', 'Topic tracker'));
    body.innerHTML = ''; body.append(views[active]());
  }
  root.append(tabs, body);
  paint();
}

function drawPattern(syl) {
  const wrap = el('div', {});
  if (syl.source) wrap.append(el('p', { class:'small' }, el('a', { href:syl.source.url,target:'_blank',rel:'noopener' }, 'Official 2025 notice · checked '+syl.source.checked), ' · ', el('a', {href:'https://www.sebi.gov.in/sebiweb/about/AboutAction.do?doVacancies=yes',target:'_blank',rel:'noopener'}, 'Recruitment updates')));
  for (const [phase,rows] of Object.entries(syl.weights || {})) wrap.append(el('div',{class:'card',style:'margin-bottom:16px'},el('h2',{},phase==='phase1'?'Phase I IT · indicative weights':'Phase II IT · indicative weights'),el('table',{class:'tbl'},el('tbody',{},...rows.map(([label,weight])=>el('tr',{},el('td',{},label),el('td',{},weight+'%')))))));

  for (const ph of syl.phases) {
    const card = el('div', { class: 'card', style: 'margin-bottom:16px' },
      el('div', { class: 'row between' },
        el('h2', { style: 'margin:0' }, ph.name),
        el('span', { class: 'pill acc' }, ph.when)),
      el('p', { class: 'small muted', style: 'margin:8px 0 14px' }, ph.nature)
    );
    const t = el('table', { class: 'tbl' },
      el('thead', {}, el('tr', {}, el('th', {}, 'Paper'), el('th', {}, 'Marks'), el('th', {}, 'Duration'), el('th', {}, 'What is asked'))),
      el('tbody', {}, ...ph.papers.map(p => el('tr', {},
        el('td', {}, el('b', {}, p.name)),
        el('td', {}, String(p.marks)),
        el('td', {}, String(p.minutes)),
        el('td', {}, p.contents)))));
    card.append(el('div', { class: 'table-wrap' }, t));
    if (ph.note) card.append(el('div', { class: 'expl', style: 'margin-top:12px' }, el('b', {}, 'Note: '), ph.note));
    ph.papers.filter(p => p.qualifying).forEach(p => card.append(el('p', { class: 'small muted', style: 'margin:8px 0 0' }, '• ' + p.qualifying)));
    wrap.append(card);
  }

  wrap.append(el('div', { class: 'card' },
    el('h2', {}, 'How to read this plan'),
    el('ul', { class: 'small', style: 'margin:0;padding-left:18px;color:var(--tx2)' },
      el('li', {}, el('b', {}, 'Phase I is a filter, not a score. '), 'Clear it comfortably, then the real fight is Phase II.'),
      el('li', {}, el('b', {}, 'The IT paper is the differentiator. '), 'Trace code, debug logic and work data examples. Use the official topic weights to allocate effort.'),
      el('li', {}, el('b', {}, 'Securities market awareness compounds. '), 'Use dated official sources for the common paper and interview examples.'),
      el('li', {}, el('b', {}, 'Descriptive practice cannot be crammed. '), 'Start typing and reviewing English drafts from the first week.'),
      el('li', {}, el('b', {}, 'Mocks are diagnosis, not scoring. '), 'A mock you did not analyse for 45 minutes afterwards was wasted.'))));
  return wrap;
}

function drawTopics(syl) {
  const wrap = el('div', {});
  let totalT = 0, doneT = 0;
  syl.subjects.forEach(s => s.topics.forEach(t => { totalT++; if (S.topic(t.id).status === 'done') doneT++; }));

  const summary = el('div', { class: 'card', style: 'margin-bottom:16px' },
    el('div', { class: 'row between', style: 'margin-bottom:8px' },
      el('b', {}, `${doneT} of ${totalT} topics marked confident`),
      el('span', { class: 'pill ' + (pct(doneT, totalT) > 70 ? 'ok' : 'acc') }, pct(doneT, totalT) + '%')),
    el('div', { class: 'bar lg', html: `<i style="width:${pct(doneT, totalT)}%"></i>` }),
    el('p', { class: 'small muted', style: 'margin:10px 0 0' },
      'Mark each topic honestly as you go. Anything left on “Needs revision” is what your Revision Queue and final week should attack first.'));
  wrap.append(summary);

  for (const s of syl.subjects) {
    const done = s.topics.filter(t => S.topic(t.id).status === 'done').length;
    const body = el('div', { class: 'week-body' });
    const card = el('div', { class: 'week' },
      el('div', { class: 'week-head', onclick: e => e.currentTarget.parentElement.classList.toggle('open') },
        el('span', { class: 'chev' }, '▸'),
        el('div', { class: 'grow' },
          el('div', { class: 'wk-n' }, s.paper),
          el('h3', {}, s.name)),
        el('span', { class: 'pill ' + (done === s.topics.length ? 'ok' : '') }, `${done}/${s.topics.length}`)),
      body);

    if (s.weightNote) body.append(el('div', { class: 'expl', style: 'margin-bottom:12px' }, s.weightNote));

    for (const t of s.topics) {
      const st = S.topic(t.id);
      const sel = el('select', { class: 'sel sm' },
        ...STATUS.map(o => el('option', { value: o.v, ...(st.status === o.v ? { selected: '' } : {}) }, o.l)));
      sel.onchange = () => { S.setTopic(t.id, { status: sel.value, lastRev: new Date().toISOString().slice(0, 10) }); row.className = 'task' + (sel.value === 'done' ? ' done' : ''); toast('Saved'); };
      const row = el('div', { class: 'task' + (st.status === 'done' ? ' done' : ''), style: 'cursor:default' },
        el('div', { class: 't-body' },
          el('p', { class: 't-title' }, t.name),
          el('p', { class: 't-meta' },
            el('span', { class: 'pill ' + (t.imp === 'high' ? 'bad' : t.imp === 'med' ? 'warn' : '') }, t.imp === 'high' ? 'High priority' : t.imp === 'med' ? 'Medium' : 'Low'),
            el('span', {}, `≈${t.est}h`),
            t.note ? el('a', { href: `#/notes/${t.note}`, class: 'link-btn' }, 'notes →') : '')),
        sel);
      body.append(row);
    }
    wrap.append(card);
  }
  return wrap;
}
