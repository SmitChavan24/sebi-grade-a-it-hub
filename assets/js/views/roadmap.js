/* Roadmap — all 180 days, week by week — and the Today view. */
import { el, esc, hm, pct, toast, fmtDateFull } from '../util.js';
import { S, currentDayNumber, dateForDay, todayISO } from '../store.js';
import { loadRoadmap, subjects, getDay, allDays } from '../data.js';

const KIND = {
  learn:    { l: 'Learn',    c: 'acc' },
  practice: { l: 'Practice', c: 'ok' },
  revise:   { l: 'Revise',   c: 'pur' },
  test:     { l: 'Test',     c: 'warn' },
  write:    { l: 'Write',    c: 'bad' },
  ca:       { l: 'Current affairs', c: '' }
};

let subjMapCache = null;

/* Renders the checkable task list for one day. Reused by the dashboard. */
export function taskList(day, subjMap = subjMapCache) {
  const wrap = el('div', {});
  day.tasks.forEach((t, i) => {
    const done = S.isTaskDone(day.n, i);
    const cb = el('input', { type: 'checkbox' });
    cb.checked = done;
    const row = el('label', { class: 'task' + (done ? ' done' : '') }, cb,
      el('div', { class: 't-body' },
        el('p', { class: 't-title' }, t.t),
        el('p', { class: 't-meta' },
          el('span', { class: 'pill ' + (KIND[t.k]?.c || '') }, KIND[t.k]?.l || t.k),
          el('span', {}, (subjMap && subjMap[t.s]?.short) || t.s),
          el('span', {}, hm(t.m)),
          t.url ? el('a', { href:t.url, class:'link-btn', onclick:e=>e.stopPropagation() }, 'start activity →') : '',
          t.n ? el('a', { href: `#/notes/${t.n}`, class: 'link-btn', onclick: e => e.stopPropagation() }, 'open notes →') : ''
        )
      )
    );
    cb.onchange = e => {
      S.toggleTask(day.n, i, e.target.checked);
      row.classList.toggle('done', e.target.checked);
      if (e.target.checked) {
        const left = day.tasks.length - S.dayDone(day.n, day.tasks.length);
        toast(left === 0 ? '🎉 Day complete — well done!' : `${left} task${left > 1 ? 's' : ''} left today`);
      }
      wrap.dispatchEvent(new CustomEvent('task:toggle', { bubbles: true }));
    };
    wrap.append(row);
  });

  const total = day.tasks.reduce((a, t) => a + t.m, 0);
  wrap.append(el('p', { class: 'small muted', style: 'margin:10px 0 0' },
    `${day.tasks.length} tasks · ${hm(total)} planned`));
  return wrap;
}

/* ---------------- Today view ---------------- */
export async function today(root) {
  const n = currentDayNumber();
  const [day, subjMap] = await Promise.all([getDay(n), subjects()]);
  subjMapCache = subjMap;

  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, `Today · Day ${n}`),
      el('p', { class: 'sub' }, `${fmtDateFull(new Date())}${day ? ' · ' + day.theme : ''}`)),
    el('div', { class: 'btn-row' },
      el('a', { class: 'btn', href: `#/roadmap?day=${n}` }, 'See in roadmap'),
      el('button', { class: 'btn sm', onclick: () => { const b = document.getElementById('timerPop'); b.hidden = false; } }, '⏱ Start timer'))
  ));

  if (!day) {
    root.append(el('div', { class: 'empty' }, el('div', { class: 'big' }, '📅'),
      el('h2', {}, n < 1 ? 'Your plan has not started yet' : 'Plan finished'),
      el('p', { class: 'small' }, 'Adjust the start date in Settings to line the plan up with today.'),
      el('a', { class: 'btn primary', href: '#/settings' }, 'Open settings')));
    return;
  }

  const head = el('div', { class: 'card', style: 'margin-bottom:16px' });
  const paint = () => {
    const done = S.dayDone(day.n, day.tasks.length);
    const p = pct(done, day.tasks.length);
    head.innerHTML = '';
    head.append(
      el('div', { class: 'row between', style: 'margin-bottom:8px' },
        el('div', {}, el('b', {}, `${done} of ${day.tasks.length} done`),
          el('span', { class: 'muted small' }, ` · ${hm(S.minutesOn(todayISO()))} studied`)),
        el('span', { class: 'pill ' + (p === 100 ? 'ok' : 'acc') }, p + '%')),
      el('div', { class: 'bar lg ' + (p === 100 ? 'ok' : ''), html: `<i style="width:${p}%"></i>` })
    );
  };
  paint();
  root.append(head);

  const list = taskList(day, subjMap);
  list.addEventListener('task:toggle', paint);
  root.append(el('div', { class: 'card' }, list));

  // tomorrow preview
  const tom = await getDay(n + 1);
  if (tom) {
    root.append(el('div', { class: 'card', style: 'margin-top:16px' },
      el('h2', {}, `Tomorrow — Day ${tom.n}`),
      el('ul', { class: 'small muted', style: 'margin:0;padding-left:18px' },
        ...tom.tasks.map(t => el('li', {}, t.t)))));
  }
}

/* ---------------- Roadmap view ---------------- */
export default async function roadmap(root, ctx) {
  const [plan, subjMap] = await Promise.all([loadRoadmap(), subjects()]);
  subjMapCache = subjMap;
  const cur = currentDayNumber();
  const jumpDay = +(ctx?.query?.get('day') || 0);

  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, plan.title),
      el('p', { class: 'sub' }, `${plan.totalDays} days · ${plan.totalTasks} tasks · ≈${plan.totalHours} study hours · Day 1 = ${dateForDay(1).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`)),
    el('div', { class: 'btn-row' },
      el('button', { class: 'btn', onclick: () => jumpTo(cur) }, 'Jump to today'),
      el('a', { class: 'btn sm', href: '#/settings' }, 'Change start date'))
  ));

  root.append(el('div', { class: 'card tight', style: 'margin-bottom:16px' },
    el('p', { class: 'small muted', style: 'margin:0' }, plan.note)));

  // phase legend
  const legend = el('div', { class: 'row', style: 'margin-bottom:14px' });
  Object.entries(plan.phases).forEach(([k, v]) => legend.append(el('span', { class: 'pill ' + v.c }, v.name)));
  root.append(legend);

  // filter
  const filter = el('select', { class: 'sel sm' },
    el('option', { value: '' }, 'All phases'),
    ...Object.entries(plan.phases).map(([k, v]) => el('option', { value: k }, v.name)));
  root.append(el('div', { class: 'row', style: 'margin-bottom:12px' }, el('span', { class: 'small muted' }, 'Filter:'), filter));

  const host = el('div', {});
  root.append(host);

  root.addEventListener('task:toggle',()=>{
    for (const w of plan.weeks) {
      const wk=document.getElementById('wk'+w.n); if(!wk)continue;
      const total=w.days.reduce((a,d)=>a+d.tasks.length,0), done=w.days.reduce((a,d)=>a+S.dayDone(d.n,d.tasks.length),0);
      wk.querySelector('.wk-prog .bar i').style.width=pct(done,total)+'%';
      wk.querySelector('.wk-prog .xsmall').textContent=done+'/'+total;
    }
  });
  const weekEls = new Map();

  function drawWeeks(phaseFilter) {
    host.innerHTML = ''; weekEls.clear();
    for (const w of plan.weeks) {
      if (phaseFilter && w.phase !== phaseFilter) continue;

      let wDone = 0, wTotal = 0;
      w.days.forEach(d => { wTotal += d.tasks.length; wDone += S.dayDone(d.n, d.tasks.length); });
      const wp = pct(wDone, wTotal);
      const isCurrent = w.days.some(d => d.n === cur);

      const body = el('div', { class: 'week-body' });
      const head = el('div', { class: 'week-head' },
        el('span', { class: 'chev' }, '▸'),
        el('div', { class: 'grow' },
          el('div', { class: 'wk-n' }, `Week ${w.n} · Day ${w.days[0].n}–${w.days.at(-1).n} · ${dateForDay(w.days[0].n).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`),
          el('h3', {}, w.theme)),
        isCurrent ? el('span', { class: 'pill acc' }, 'current') : '',
        el('div', { class: 'wk-prog' },
          el('div', { class: 'bar ' + (wp === 100 ? 'ok' : ''), html: `<i style="width:${wp}%"></i>` }),
          el('div', { class: 'xsmall muted', style: 'text-align:right;margin-top:3px' }, `${wDone}/${wTotal}`))
      );
      const wk = el('div', { class: 'week' + (isCurrent ? ' open' : ''), id: 'wk' + w.n }, head, body);
      head.onclick = () => { wk.classList.toggle('open'); if (wk.classList.contains('open') && !body.dataset.filled) fill(w, body); };
      if (isCurrent) fill(w, body);
      host.append(wk);
      weekEls.set(w.n, wk);
    }
  }

  function fill(w, body) {
    body.dataset.filled = '1';
    body.innerHTML = '';
    for (const d of w.days) {
      const date = dateForDay(d.n);
      const isToday = d.n === cur;
      const pastDue = d.n < cur && S.dayDone(d.n, d.tasks.length) < d.tasks.length;
      const dayEl = el('div', { class: 'day' + (isToday ? ' today' : pastDue ? ' past-due' : ''), id: 'day' + d.n });
      const dh = el('div', { class: 'day-head' },
        el('b', {}, `Day ${d.n}`),
        el('span', { class: 'date' }, date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })),
        isToday ? el('span', { class: 'pill acc' }, 'today') : '',
        pastDue ? el('span', { class: 'pill warn' }, 'pending') : '',
        d.dow === 0 ? el('span', { class: 'pill pur' }, 'revision day') : '',
        el('span', { class: 'spacer' }),
        el('button', {
          class: 'btn sm ghost',
          onclick: e => {
            const all = d.tasks.every((_, i) => S.isTaskDone(d.n, i));
            d.tasks.forEach((_, i) => S.toggleTask(d.n, i, !all));
            fill(w, body);
            root.dispatchEvent(new CustomEvent("task:toggle"));
            toast(all ? 'Day cleared' : 'Day marked complete ✅');
          }
        }, 'toggle all'));
      dayEl.append(dh, taskList(d, subjMap));
      body.append(dayEl);
    }
  }

  function jumpTo(n) {
    filter.value = ''; drawWeeks('');
    const w = plan.weeks.find(w => w.days.some(d => d.n === n));
    if (!w) return;
    const wk = weekEls.get(w.n);
    wk.classList.add('open');
    const body = wk.querySelector('.week-body');
    if (!body.dataset.filled) fill(w, body);
    setTimeout(() => document.getElementById('day' + n)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
  }

  filter.onchange = () => drawWeeks(filter.value);
  drawWeeks('');
  if (jumpDay) jumpTo(jumpDay);
  else setTimeout(() => document.getElementById('day' + cur)?.scrollIntoView({ block: 'center' }), 100);
}
