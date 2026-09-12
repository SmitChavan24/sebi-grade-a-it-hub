/* Analytics — honest numbers about where your time actually went. */
import { el, hm, pct, lineChart, barChart, heatmap } from '../util.js';
import { S, todayISO, currentDayNumber } from '../store.js';
import { planProgress, subjectProgress, subjects, pacing, allDays } from '../data.js';

export default async function analytics(root) {
  const [prog, sp, subjMap, pace, days] = await Promise.all([
    planProgress(), subjectProgress(), subjects(), pacing(), allDays()
  ]);

  const totalMins = S.totalMinutes();
  const activeDays = Object.values(S.sessions).filter(m => m > 0).length;
  const avgDay = activeDays ? Math.round(totalMins / activeDays) : 0;
  const cur = currentDayNumber();

  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, 'Analytics'),
      el('p', { class: 'sub' }, 'Effort, coverage and accuracy — the three numbers that predict your result.'))));

  root.append(el('div', { class: 'grid g4', style: 'margin-bottom:18px' },
    stat('Total studied', hm(totalMins), `${activeDays} active days`, 'acc'),
    stat('Daily average', hm(avgDay), `target ${S.settings.dailyHours}h`, avgDay >= S.settings.dailyHours * 60 ? 'ok' : 'warn'),
    stat('Plan complete', prog.pct + '%', `${prog.done}/${prog.total} tasks`, 'pur'),
    stat('On-pace', pace.pct + '%', `${pace.backlog.length} backlog tasks`, pace.backlog.length > 20 ? 'bad' : pace.backlog.length ? 'warn' : 'ok')));

  /* hours over last 30 days */
  const vals = [], labs = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const iso = d.toLocaleDateString('sv-SE');
    vals.push(Math.round((S.minutesOn(iso) / 60) * 10) / 10);
    labs.push(d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }));
  }
  root.append(el('div', { class: 'card', style: 'margin-bottom:16px' },
    el('h2', {}, 'Study hours — last 30 days'),
    el('div', { html: lineChart(vals, labs, { h: 170, fmt: v => v + 'h' }) }),
    el('div', { class: 'divider' }),
    el('h3', { style: 'font-size:.85rem' }, 'Every day since you started'),
    el('div', { html: heatmap(S.sessions, 119) }),
    el('p', { class: 'xsmall muted', style: 'margin-top:8px' }, 'Darker = more hours. Gaps are what cost people this exam — not bad days, missing days.')));

  /* subject time & coverage */
  const rows = Object.entries(sp).sort((a, b) => b[1].mins - a[1].mins);
  const cov = el('div', { class: 'card', style: 'margin-bottom:16px' },
    el('h2', {}, 'Coverage by subject'),
    el('p', { class: 'small muted' }, 'Percentage of the planned tasks you have actually ticked off, per subject.'));
  const tbl = el('table', { class: 'tbl' },
    el('thead', {}, el('tr', {}, el('th', {}, 'Subject'), el('th', {}, 'Tasks'), el('th', {}, 'Planned'), el('th', {}, 'Done'), el('th', { style: 'width:32%' }, 'Progress'))),
    el('tbody', {}, ...rows.map(([sid, m]) => {
      const p = pct(m.done, m.total);
      return el('tr', {},
        el('td', {}, subjMap[sid]?.short || sid),
        el('td', { class: 'num' }, `${m.done}/${m.total}`),
        el('td', { class: 'num' }, hm(m.mins)),
        el('td', { class: 'num' }, hm(m.minsDone)),
        el('td', {}, el('div', { class: 'bar ' + (p >= 80 ? 'ok' : p >= 40 ? '' : 'warn'), html: `<i style="width:${p}%"></i>` })));
    })));
  cov.append(el('div', { class: 'table-wrap' }, tbl));
  root.append(cov);

  /* quiz accuracy by subject */
  const att = S.quiz.attempts;
  const acc = el('div', { class: 'card', style: 'margin-bottom:16px' }, el('h2', {}, 'Question-bank performance'));
  if (!att.length) acc.append(el('p', { class: 'small muted' }, 'No attempts logged yet.'));
  else {
    const chron = att.slice(0, 20).reverse();
    acc.append(el('div', { html: lineChart(chron.map(a => pct(a.correct, a.total)), chron.map(a => a.d.slice(5)), { h: 160, max: 100, fmt: v => v + '%' }) }));
    const tot = att.reduce((a, b) => a + b.total, 0), cor = att.reduce((a, b) => a + b.correct, 0);
    acc.append(el('p', { class: 'small muted', style: 'margin:10px 0 0' },
      `${att.length} sets · ${tot} questions · ${pct(cor, tot)}% overall accuracy · ${S.quiz.wrong.length} questions still marked wrong.`));
  }
  root.append(acc);

  /* mock trend */
  if (S.mocks.length) {
    const chron = S.mocks.slice().reverse();
    root.append(el('div', { class: 'card', style: 'margin-bottom:16px' },
      el('h2', {}, 'Mock scores'),
      el('div', { html: barChart(chron.slice(-14).map(m => ({ l: m.d.slice(5), v: pct(m.score, m.max) })), { h: 170 }) })));
  }

  /* projection */
  const remaining = prog.total - prog.done;
  const daysLeft = Math.max(1, 180 - cur);
  const tasksPerDay = remaining / daysLeft;
  root.append(el('div', { class: 'card' },
    el('h2', {}, 'Where this is heading'),
    el('ul', { class: 'small', style: 'padding-left:18px;color:var(--tx2)' },
      el('li', {}, `You are on day ${cur} of 180. ${remaining} tasks remain — that is `, el('b', {}, tasksPerDay.toFixed(1)), ' tasks/day to finish on time (the plan averages 6.7/day).'),
      el('li', {}, `At your current average of ${hm(avgDay)}/day, the remaining ${hm(prog.minsPlanned - prog.minsDone)} of planned work needs `,
        el('b', {}, `${Math.ceil((prog.minsPlanned - prog.minsDone) / Math.max(60, avgDay))} more study days`), '.'),
      pace.backlog.length > 30
        ? el('li', {}, el('b', {}, 'Backlog warning: '), `${pace.backlog.length} tasks are overdue. Do not try to clear all of it — pick the “high priority” topics from the Syllabus tracker and formally drop the rest.`)
        : el('li', {}, 'Backlog is under control. Protect that — it is the main predictor of finishing the plan.'),
      el('li', {}, 'Weakest coverage right now: ', el('b', {}, rows.filter(r => pct(r[1].done, r[1].total) < 40).slice(0, 3).map(r => subjMap[r[0]]?.short || r[0]).join(', ') || 'nothing below 40% — good'), '.'))));
}

const stat = (k, v, d, c) => el('div', { class: 'stat ' + c }, el('div', { class: 'k' }, k), el('div', { class: 'v' }, v), el('div', { class: 'd' }, d));
