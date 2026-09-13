/* Question bank — practice & timed test modes. */
import { el, esc, shuffle, toast, pct, hm } from '../util.js';
import { S } from '../store.js';
import { loadQuestions, subjects } from '../data.js';

export default async function practice(root, ctx) {
  const [bank, subjMap] = await Promise.all([loadQuestions(), subjects()]);
  const qs = bank.questions;

  const preSubject = ctx?.query?.get('s');
  const preMode = ctx?.query?.get('mode');
  if (preMode === 'wrong') return start(root, qs.filter(q => S.quiz.wrong.includes(q.id)), subjMap, { mode: 'practice', title: 'Wrong-answer review' });

  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, 'Question Bank'),
      el('p', { class: 'sub' }, `${qs.length} original questions across core areas. Explanations support learning; this is not an official paper or full mock series.`))
  ));

  const counts = {};
  qs.forEach(q => counts[q.s] = (counts[q.s] || 0) + 1);

  const sel = new Set(preSubject ? [preSubject] : []);
  const grid = el('div', { class: 'grid g-auto', style: 'margin-bottom:18px' });
  Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([sid, n]) => {
    const card = el('div', { class: 'note-card', style: sel.has(sid) ? 'border-color:var(--acc);background:var(--accsoft)' : '' },
      el('h4', {}, subjMap[sid]?.short || sid),
      el('p', {}, `${n} questions`));
    card.onclick = () => {
      if (sel.has(sid)) sel.delete(sid); else sel.add(sid);
      card.style.cssText = sel.has(sid) ? 'border-color:var(--acc);background:var(--accsoft)' : '';
      updateCount();
    };
    grid.append(card);
  });

  const countSel = el('select', { class: 'sel' }, ...[10, 20, 25, 40, 50, 100].map(n => el('option', { value: n, ...(n === 20 ? { selected: '' } : {}) }, `${n} questions`)));
  const modeSel = el('select', { class: 'sel' },
    el('option', { value: 'practice' }, 'Practice — answer shown instantly'),
    el('option', { value: 'test' }, 'Test — timed, results at the end'));
  const diffSel = el('select', { class: 'sel' },
    el('option', { value: '' }, 'All difficulty'),
    el('option', { value: 'easy' }, 'Easy'), el('option', { value: 'med' }, 'Medium'), el('option', { value: 'hard' }, 'Hard'));
  const info = el('p', { class: 'small muted', style: 'margin:0' });
  const go = el('button', { class: 'btn primary' }, 'Start →');

  function pool() {
    return qs.filter(q => (!sel.size || sel.has(q.s)) && (!diffSel.value || q.d === diffSel.value));
  }
  function updateCount() { info.textContent = `${pool().length} questions match your selection.`; }

  /* ---- pattern-accurate papers ---- */
  const P1_SUBJECTS = ['ga', 'eng', 'qa', 'reas'];
  const IT_SUBJECTS = ['it-prog', 'it-ds', 'it-dbms', 'it-cn', 'it-os', 'it-se', 'it-coa', 'it-web', 'it-sec', 'it-cloud', 'it-fin', 'it-data', 'it-shell'];
  function paper(subjects, n, title, minutes) {
    const picked = [];
    const buckets = subjects.map(s => shuffle(qs.filter(q => q.s === s)));
    let i = 0;
    while (picked.length < n && buckets.some(b => b.length)) {      // round-robin keeps the mix even
      const b = buckets[i++ % buckets.length];
      if (b.length) picked.push(b.pop());
    }
    if (!picked.length) { toast('No questions available for that paper'); return; }
    start(root, shuffle(picked), subjMap, { mode: 'test', title: title + ' · ' + picked.length + ' Q / ' + minutes + ' min' });
  }

  root.append(el('div', { class: 'card', style: 'margin-bottom:18px' },
    el('h2', {}, 'Exam-pattern papers'),
    el('p', { class: 'small muted' },
      'Timed papers built to the real structure. SEBI does not release past papers — these are pattern-accurate practice, not recovered question papers. ',
      el('a', { href: '#/notes/pyq-previous-papers' }, 'What exists and what does not →')),
    el('div', { class: 'btn-row' },
      el('button', { class: 'btn primary', onclick: () => paper(P1_SUBJECTS, 100, 'Phase I Paper 1', 60) }, 'Phase I · Paper 1 (100 Q / 60 min)'),
      el('button', { class: 'btn primary', onclick: () => paper(IT_SUBJECTS, 100, 'Phase I Paper 2 — IT', 40) }, 'Phase I · Paper 2 IT (100 Q / 40 min)'),
      el('button', { class: 'btn', onclick: () => paper(IT_SUBJECTS, 40, 'IT sprint', 15) }, 'IT sprint (40 Q / 15 min)'),
      el('button', { class: 'btn', onclick: () => paper(['ga'], 30, 'Securities market drill', 15) }, 'Securities market (30 Q)')),
    el('p', { class: 'xsmall muted', style: 'margin:10px 0 0' },
      'The IT paper allows about 24 seconds per question. If a sprint feels rushed, that is the exam telling you something true.')));

  root.append(el('div', { class: 'card', style: 'margin-bottom:18px' },
    el('h2', {}, 'Pick your subjects'),
    el('p', { class: 'small muted' }, 'Nothing selected = everything. Tap to toggle.'),
    grid,
    el('div', { class: 'row', style: 'gap:10px' }, countSel, diffSel, modeSel, go),
    el('div', { style: 'margin-top:10px' }, info)));

  diffSel.onchange = updateCount;
  updateCount();

  go.onclick = () => {
    const p = shuffle(pool()).slice(0, +countSel.value);
    if (!p.length) { toast('No questions match — widen the filter'); return; }
    start(root, p, subjMap, { mode: modeSel.value });
  };

  /* ---- history + weak areas ---- */
  const att = S.quiz.attempts;
  const hist = el('div', { class: 'card' },
    el('div', { class: 'row between', style: 'margin-bottom:10px' },
      el('h2', { style: 'margin:0' }, 'Your attempts'),
      S.quiz.wrong.length ? el('a', { class: 'btn sm', href: '#/practice?mode=wrong' }, `Review ${S.quiz.wrong.length} wrong answers`) : ''));
  if (!att.length) hist.append(el('p', { class: 'small muted' }, 'No attempts yet. Do 20 questions today — that is how the plan expects you to end each study block.'));
  else {
    const t = el('table', { class: 'tbl' },
      el('thead', {}, el('tr', {}, el('th', {}, 'Date'), el('th', {}, 'Set'), el('th', {}, 'Score'), el('th', {}, 'Accuracy'), el('th', {}, 'Time'))),
      el('tbody', {}, ...att.slice(0, 15).map(a => el('tr', {},
        el('td', {}, a.d),
        el('td', {}, a.label || 'Mixed'),
        el('td', { class: 'num' }, `${a.correct}/${a.total}`),
        el('td', { class: 'num' }, pct(a.correct, a.total) + '%'),
        el('td', { class: 'num' }, hm(Math.round((a.secs || 0) / 60)))))));
    hist.append(el('div', { class: 'table-wrap' }, t));
  }
  root.append(hist);
}

/* ------------------------------------------------------------------ */
function start(root, questions, subjMap, opts) {
  if (!questions.length) {
    root.innerHTML = '';
    root.append(el('div', { class: 'empty' }, el('div', { class: 'big' }, '🎉'),
      el('h2', {}, 'Nothing to review'),
      el('p', { class: 'small muted' }, 'You have no wrong answers pending. Go get some new ones.'),
      el('a', { class: 'btn primary', href: '#/practice' }, 'Back to question bank')));
    return;
  }
  root.innerHTML = '';
  const isTest = opts.mode === 'test';
  const answers = new Array(questions.length).fill(null);
  let i = 0;
  const t0 = Date.now();

  const head = el('div', { class: 'page-head' });
  const card = el('div', { class: 'q-card' });
  const nav = el('div', { class: 'row between', style: 'margin-top:14px' });
  root.append(head, card, nav);

  let finished=false;
  const budget=questions.length*60;
  const timerLbl = el('span', { class: 'pill acc' }, '0:00');
  const tick = setInterval(() => {
    const s = Math.floor((Date.now() - t0) / 1000);
    timerLbl.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    if (isTest) {
      if(s>=budget){finish();return;}
      timerLbl.className = 'pill ' + (s > budget ? 'bad' : s > budget * .7 ? 'warn' : 'acc');
    }
  }, 1000);

  function paintHead() {
    head.innerHTML = '';
    const answered = answers.filter(a => a !== null).length;
    head.append(
      el('div', { class: 'grow' },
        el('h1', { style: 'font-size:1.15rem' }, opts.title || (isTest ? 'Timed drill · 60 seconds per question' : 'Practice set')),
        el('p', { class: 'sub' }, `Question ${i + 1} of ${questions.length} · ${answered} answered`)),
      el('div', { class: 'row' }, timerLbl,
        el('button', { class: 'btn sm ghost', onclick: () => { clearInterval(tick); finish(); } }, isTest ? 'Submit' : 'Finish'))
    );
  }

  function paint() {
    paintHead();
    const q = questions[i];
    card.innerHTML = '';
    card.append(
      el('div', { class: 'row', style: 'gap:6px;margin-bottom:10px' },
        el('span', { class: 'pill acc' }, subjMap[q.s]?.short || q.s),
        q.d ? el('span', { class: 'pill ' + (q.d === 'hard' ? 'bad' : q.d === 'med' ? 'warn' : 'ok') }, q.d) : '',
        S.quiz.wrong.includes(q.id) ? el('span', { class: 'pill bad' }, 'previously wrong') : ''),
      el('div', { class: 'q-text', html: esc(q.q).replace(/\n/g, '<br>') })
    );

    const opts_ = el('div', {});
    q.o.forEach((o, k) => {
      const chosen = answers[i] === k;
      const row = el('div', { class: 'opt' + (chosen ? ' sel' : '') },
        el('span', { class: 'lt' }, 'ABCD'[k]), el('span', {}, o));
      row.onclick = () => {
        if (answers[i] !== null && !isTest) return;   // practice: lock after answering
        answers[i] = k;
        if (isTest) { paint(); }
        else {
          [...opts_.children].forEach((c, ci) => {
            c.classList.add('disabled');
            if (ci === q.a) c.classList.add('right');
            else if (ci === k) c.classList.add('wrong');
          });
          if (k === q.a) { S.markRight(q.id); toast('Correct ✓'); } else S.markWrong(q.id);
          if (q.e) card.append(el('div', { class: 'expl' }, el('b', {}, k === q.a ? 'Why: ' : 'Correct answer — ' + 'ABCD'[q.a] + ': '), q.e));
          paintHead();
        }
      };
      opts_.append(row);
    });
    if(!isTest && answers[i]!==null){
      [...opts_.children].forEach((row,k)=>{row.classList.add('disabled');if(k===q.a)row.classList.add('right');else if(k===answers[i])row.classList.add('wrong');});
      card.append(el('div',{class:'expl'},q.e));
    }
    card.append(opts_);

    nav.innerHTML = '';
    nav.append(
      el('button', { class: 'btn ghost', onclick: () => { if (i > 0) { i--; paint(); } }, disabled: i === 0 || null }, '← Previous'),
      el('div', { class: 'row', style: 'gap:6px' },
        ...questions.map((_, k) => el('button', {
          class: 'btn sm ' + (k === i ? 'primary' : answers[k] !== null ? 'ok' : 'ghost'),
          style: 'width:30px;padding:4px 0',
          onclick: () => { i = k; paint(); }
        }, String(k + 1))).slice(Math.max(0, i - 4), Math.max(0, i - 4) + 9)),
      i === questions.length - 1
        ? el('button', { class: 'btn primary', onclick: () => { clearInterval(tick); finish(); } }, 'Finish ✓')
        : el('button', { class: 'btn primary', onclick: () => { i++; paint(); } }, 'Next →'));
  }

  function finish() {
    if(finished)return;finished=true;clearInterval(tick);
    const secs = Math.round((Date.now() - t0) / 1000);
    let correct = 0;
    questions.forEach((q, k) => {
      if (answers[k] === q.a) { correct++; if (isTest) S.markRight(q.id); }
      else if (answers[k] !== null && isTest) S.markWrong(q.id);
    });
    const attempted = answers.filter(a => a !== null).length;
    const net=correct-(attempted-correct)*0.25;
    S.logAttempt({ total: questions.length, attempted, correct, secs, label: opts.title || (isTest ? 'Timed test' : 'Practice') });

    root.innerHTML = '';
    const p = pct(correct, questions.length);
    root.append(el('div', { class: 'page-head' }, el('div', { class: 'grow' },
      el('h1', {}, 'Result'),
      el('p', { class: 'sub' }, `${questions.length} questions · ${Math.round(secs / questions.length)}s per question average`))));

    root.append(el('div', { class: 'grid g4', style: 'margin-bottom:18px' },
      stat('Net score', `${net}/${questions.length}`, `${correct} correct · −0.25 per wrong`, p >= 70 ? 'ok' : p >= 50 ? 'warn' : 'bad'),
      stat('Attempted', String(attempted), `${questions.length - attempted} skipped`, 'acc'),
      stat('Accuracy', attempted ? pct(correct, attempted) + '%' : '—', 'of what you attempted', 'pur'),
      stat('Time', `${Math.floor(secs / 60)}m ${secs % 60}s`, 'total', '')));

    const rev = el('div', { class: 'card' }, el('h2', {}, 'Review every question'));
    questions.forEach((q, k) => {
      const ok = answers[k] === q.a;
      rev.append(el('div', { style: 'padding:12px 0;border-bottom:1px solid var(--line)' },
        el('div', { class: 'row', style: 'gap:8px;margin-bottom:6px' },
          el('span', { class: 'pill ' + (ok ? 'ok' : answers[k] === null ? '' : 'bad') }, ok ? '✓ correct' : answers[k] === null ? 'skipped' : '✗ wrong'),
          el('span', { class: 'pill' }, subjMap[q.s]?.short || q.s)),
        el('p', { style: 'font-weight:600;margin:0 0 6px;font-size:.9rem' }, `${k + 1}. ${q.q}`),
        el('p', { class: 'small', style: 'margin:0 0 4px' },
          el('b', {}, 'Answer: '), `${'ABCD'[q.a]}. ${q.o[q.a]}`,
          answers[k] !== null && !ok ? ` — you chose ${'ABCD'[answers[k]]}. ${q.o[answers[k]]}` : ''),
        q.e ? el('p', { class: 'small muted', style: 'margin:0' }, q.e) : ''));
    });
    root.append(rev);
    root.append(el('div', { class: 'btn-row', style: 'margin-top:16px' },
      el('a', { class: 'btn primary', href: '#/practice' }, 'Another set'),
      el('a', { class: 'btn', href: '#/revision' }, 'Revision queue'),
      el('a', { class: 'btn ghost', href: '#/dashboard' }, 'Dashboard')));
    window.scrollTo(0, 0);
  }

  const cleanup=new MutationObserver(()=>{if(!head.isConnected){clearInterval(tick);cleanup.disconnect();}});cleanup.observe(document.body,{childList:true,subtree:true});
  const stat = (k, v, d, c) => el('div', { class: 'stat ' + c }, el('div', { class: 'k' }, k), el('div', { class: 'v' }, v), el('div', { class: 'd' }, d));
  paint();
}
