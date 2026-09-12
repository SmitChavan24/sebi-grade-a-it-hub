/* Mock test log — record every mock, watch the trend, diagnose the leak. */
import { el, toast, pct, lineChart, fmtDate, confirmBox } from '../util.js';
import { S, todayISO } from '../store.js';

const TYPES = ['Phase I — Paper 1', 'Phase I — Paper 2 (IT)', 'Phase I — Full', 'Phase II — Paper 1 (English)', 'Phase II — Paper 2 (IT)', 'Sectional — GA', 'Sectional — Quant', 'Sectional — Reasoning', 'Sectional — English', 'Sectional — IT'];

export default async function mocks(root) {
  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, 'Mock Test Log'),
      el('p', { class: 'sub' }, 'A mock you did not analyse was a waste of two hours. Log the score, then log what actually went wrong.'))
  ));

  /* ---- form ---- */
  const f = {
    d: el('input', { class: 'inp', type: 'date', value: todayISO() }),
    name: el('input', { class: 'inp', placeholder: 'e.g. Oliveboard SEBI IT Mock 3' }),
    type: el('select', { class: 'sel' }, ...TYPES.map(t => el('option', { value: t }, t))),
    max: el('input', { class: 'inp', type: 'number', value: '100', min: '1' }),
    attempted: el('input', { class: 'inp', type: 'number', placeholder: 'e.g. 78', min: '0' }),
    correct: el('input', { class: 'inp', type: 'number', placeholder: 'e.g. 64', min: '0' }),
    score: el('input', { class: 'inp', type: 'number', step: '0.25', placeholder: 'e.g. 61.75' }),
    notes: el('textarea', { class: 'inp', placeholder: 'What went wrong? Which topics? Silly mistakes vs concept gaps vs time pressure?' })
  };
  const fld = (l, n) => el('label', { class: 'fld' }, el('span', {}, l), n);

  const form = el('div', { class: 'card', style: 'margin-bottom:18px' },
    el('h2', {}, 'Log a mock'),
    el('div', { class: 'grid g3' }, fld('Date', f.d), fld('Mock name', f.name), fld('Paper', f.type)),
    el('div', { class: 'grid g4' }, fld('Max marks', f.max), fld('Attempted', f.attempted), fld('Correct', f.correct), fld('Final score', f.score)),
    fld('Analysis (be brutal)', f.notes),
    el('button', {
      class: 'btn primary', onclick: () => {
        if (!f.name.value.trim()) { toast('Give the mock a name'); return; }
        S.addMock({
          d: f.d.value || todayISO(), name: f.name.value.trim(), type: f.type.value,
          max: +f.max.value || 100, attempted: +f.attempted.value || 0,
          correct: +f.correct.value || 0, score: +f.score.value || 0, notes: f.notes.value.trim()
        });
        toast('Mock logged ✓');
        f.name.value = ''; f.attempted.value = ''; f.correct.value = ''; f.score.value = ''; f.notes.value = '';
        paint();
      }
    }, 'Save mock'));
  root.append(form);

  const body = el('div', {});
  root.append(body);

  function paint() {
    body.innerHTML = '';
    const list = S.mocks;
    if (!list.length) {
      body.append(el('div', { class: 'empty' }, el('div', { class: 'big' }, '📝'),
        el('h2', {}, 'No mocks logged yet'),
        el('p', { class: 'small muted' }, 'The plan schedules your first full mock around day 127 — but take a diagnostic one in week 1 so you know where you stand.')));
      return;
    }

    const pctOf = m => pct(m.score, m.max);
    const avg = Math.round(list.reduce((a, m) => a + pctOf(m), 0) / list.length);
    const best = Math.max(...list.map(pctOf));
    const accuracy = (() => {
      const a = list.reduce((x, m) => x + m.attempted, 0), c = list.reduce((x, m) => x + m.correct, 0);
      return a ? pct(c, a) : 0;
    })();

    body.append(el('div', { class: 'grid g4', style: 'margin-bottom:18px' },
      stat('Mocks taken', String(list.length), 'keep it weekly', 'acc'),
      stat('Average', avg + '%', 'across all papers', avg >= 60 ? 'ok' : 'warn'),
      stat('Best', best + '%', 'your ceiling', 'ok'),
      stat('Accuracy', accuracy + '%', 'correct ÷ attempted', accuracy >= 80 ? 'ok' : accuracy >= 65 ? 'warn' : 'bad')));

    // trend chart
    const chron = list.slice().reverse();
    body.append(el('div', { class: 'card', style: 'margin-bottom:18px' },
      el('h2', {}, 'Score trend (% of max)'),
      el('div', { html: lineChart(chron.map(pctOf), chron.map(m => fmtDate(m.d)), { h: 160, max: 100, fmt: v => v + '%' }) }),
      el('p', { class: 'small muted', style: 'margin:8px 0 0' },
        'What matters is the slope, not any single mock. A flat line for 4 mocks means your revision method — not your effort — is the problem.')));

    // per-paper breakdown
    const byType = {};
    list.forEach(m => (byType[m.type] ||= []).push(pctOf(m)));
    const bt = el('div', { class: 'card', style: 'margin-bottom:18px' }, el('h2', {}, 'By paper'));
    Object.entries(byType).forEach(([t, arr]) => {
      const a = Math.round(arr.reduce((x, y) => x + y, 0) / arr.length);
      bt.append(el('div', { style: 'margin-bottom:11px' },
        el('div', { class: 'row between', style: 'font-size:.8rem;margin-bottom:4px' },
          el('span', {}, `${t} · ${arr.length} mock${arr.length > 1 ? 's' : ''}`),
          el('span', { class: 'muted' }, a + '%')),
        el('div', { class: 'bar ' + (a >= 60 ? 'ok' : a >= 45 ? 'warn' : ''), html: `<i style="width:${a}%"></i>` })));
    });
    body.append(bt);

    // log
    const log = el('div', { class: 'card' }, el('h2', {}, 'All mocks'));
    list.forEach(m => {
      const p = pctOf(m);
      log.append(el('div', { style: 'padding:12px 0;border-bottom:1px solid var(--line)' },
        el('div', { class: 'row between' },
          el('div', {},
            el('b', {}, m.name),
            el('div', { class: 'xsmall muted' }, `${fmtDate(m.d)} · ${m.type}`)),
          el('div', { class: 'row', style: 'gap:8px' },
            el('span', { class: 'pill ' + (p >= 60 ? 'ok' : p >= 45 ? 'warn' : 'bad') }, `${m.score}/${m.max} · ${p}%`),
            el('button', {
              class: 'icon-btn sm', title: 'Delete',
              onclick: () => { if (confirmBox('Delete this mock entry?')) { S.delMock(m.id); paint(); } }
            }, '✕'))),
        m.attempted ? el('p', { class: 'xsmall muted', style: 'margin:6px 0 0' },
          `Attempted ${m.attempted} · correct ${m.correct} · accuracy ${pct(m.correct, m.attempted)}%`) : '',
        m.notes ? el('div', { class: 'expl', style: 'margin-top:8px' }, m.notes) : ''));
    });
    body.append(log);
  }
  paint();
}

const stat = (k, v, d, c) => el('div', { class: 'stat ' + c }, el('div', { class: 'k' }, k), el('div', { class: 'v' }, v), el('div', { class: 'd' }, d));
