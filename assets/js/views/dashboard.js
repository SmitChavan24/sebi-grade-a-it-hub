/* Dashboard — where you land every morning. */
import { el, esc, hm, pct, fmtDateFull, lineChart, heatmap, toast } from '../util.js';
import { S, currentDayNumber, todayISO, daysToExam, dateForDay } from '../store.js';
import { todayPlan, planProgress, subjectProgress, subjects, pacing } from '../data.js';
import { resourceStrip } from '../resources.js';
import { taskList } from './roadmap.js';

export default async function dashboard(root) {
  const [{ n, day, total }, prog, sp, subjMap, pace] = await Promise.all([
    todayPlan(), planProgress(), subjectProgress(), subjects(), pacing()
  ]);

  const name = S.settings.name ? `, ${S.settings.name}` : '';
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const minsToday = S.minutesOn(todayISO());
  const targetMins = (S.settings.dailyHours || 4) * 60;
  const dte = daysToExam();

  const doneToday = day ? S.dayDone(day.n, day.tasks.length) : 0;
  const plannedToday = day ? day.tasks.reduce((a, t) => a + t.m, 0) : 0;

  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, `${greet}${name}`),
      el('p', { class: 'sub' }, `${fmtDateFull(new Date())} · ${n >= 1 && n <= total ? `Day ${n} of ${total}` : 'Outside plan window'} · ${day ? day.theme : '—'}`)
    ),
    el('div', { class: 'btn-row' },
      el('a', { class: 'btn primary', href: '#/today' }, "Today's targets →"),
      el('a', { class: 'btn', href: '#/practice' }, 'Quick quiz')
    )
  ));

  /* ---- stat tiles ---- */
  const tiles = el('div', { class: 'grid g4', style: 'margin-bottom:18px' });
  const tile = (k, v, d, cls = '') => el('div', { class: 'stat ' + cls },
    el('div', { class: 'k' }, k), el('div', { class: 'v' }, v), el('div', { class: 'd' }, d));

  tiles.append(
    tile('Today', `${doneToday}/${day ? day.tasks.length : 0}`, `${hm(plannedToday)} planned`, 'acc'),
    tile('Studied today', hm(minsToday), `Target ${hm(targetMins)} · ${pct(minsToday, targetMins)}%`, minsToday >= targetMins ? 'ok' : ''),
    tile('Plan complete', prog.pct + '%', `${prog.done} of ${prog.total} tasks`, 'pur'),
    tile('On-pace', pace.pct + '%', pace.backlog.length ? `${pace.backlog.length} tasks in backlog` : 'No backlog — clean', pace.backlog.length ? 'warn' : 'ok')
  );
  root.append(tiles);
  if(!S.settings.name) root.append(el('div',{class:'card welcome-card',style:'margin-bottom:18px'},el('div',{class:'eyebrow'},'YOUR NEXT CHAPTER'),el('h2',{},'A little progress, every day.'),el('p',{class:'small muted'},'Start with today’s linked lessons. This plan uses four focused hours a day and the official 2025 IT syllabus as its baseline.'),el('div',{class:'btn-row'},el('a',{class:'btn primary',href:'#/settings'},'Personalise your plan'),el('a',{class:'btn',href:'#/library'},'Explore the included books'))));
  root.addEventListener('task:toggle',async()=>{
    const fresh=await planProgress(), paceNow=await pacing();
    tiles.children[0].querySelector('.v').textContent=S.dayDone(day.n,day.tasks.length)+'/'+day.tasks.length;
    tiles.children[2].querySelector('.v').textContent=fresh.pct+'%';
    tiles.children[2].querySelector('.d').textContent=fresh.done+' of '+fresh.total+' tasks';
    tiles.children[3].querySelector('.v').textContent=paceNow.pct+'%';
  });

  /* ---- main two-column ---- */
  const cols = el('div', { class: 'grid', style: 'grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);gap:16px;align-items:start' });

  /* left: today's tasks */
  const left = el('div', {});
  const todayCard = el('div', { class: 'card' },
    el('div', { class: 'row between', style: 'margin-bottom:12px' },
      el('h2', { style: 'margin:0' }, "Today's targets"),
      el('a', { class: 'link-btn', href: '#/roadmap' }, 'Full roadmap')
    )
  );
  if (!day) {
    todayCard.append(el('p', { class: 'muted small' },
      n < 1 ? 'Your plan starts later — change the start date in Settings to begin today.'
            : 'You are past day 180 of the plan. Use Revision Queue + Mock Test Log from here, or reset the start date for a fresh cycle.'));
  } else {
    todayCard.append(taskList(day, subjMap));
  }
  left.append(todayCard);

  /* backlog */
  if (pace.backlog.length) {
    const bl = el('div', { class: 'card', style: 'margin-top:16px' },
      el('div', { class: 'row between', style: 'margin-bottom:10px' },
        el('h2', { style: 'margin:0' }, 'Backlog'),
        el('span', { class: 'pill warn' }, `${pace.backlog.length} pending`)
      ),
      el('p', { class: 'small muted', style: 'margin-bottom:10px' },
        'Overdue tasks from earlier days. Clear the oldest first — or accept the loss and move on; never let backlog stop today\'s plan.')
    );
    pace.backlog.slice(0, 6).forEach(t => {
      const row = el('label', { class: 'task' },
        el('input', { type: 'checkbox', onchange: e => { S.toggleTask(t.day, t.idx, e.target.checked); row.classList.toggle('done', e.target.checked); toast('Backlog cleared 👍'); } }),
        el('div', { class: 't-body' },
          el('p', { class: 't-title' }, t.t),
          el('p', { class: 't-meta' },
            el('span', { class: 'pill' }, `Day ${t.day}`),
            el('span', {}, subjMap[t.s]?.short || t.s),
            el('span', {}, hm(t.m))
          )
        )
      );
      bl.append(row);
    });
    if (pace.backlog.length > 6) bl.append(el('p', { class: 'small muted', style: 'margin:8px 0 0' }, `+ ${pace.backlog.length - 6} more — see the roadmap.`));
    left.append(bl);
  }

  /* study hours chart */
  const days14 = [], vals = [], labs = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const iso = d.toLocaleDateString('sv-SE');
    days14.push(iso); vals.push(Math.round((S.minutesOn(iso) / 60) * 10) / 10);
    labs.push(d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }));
  }
  left.append(el('div', { class: 'card', style: 'margin-top:16px' },
    el('h2', {}, 'Study hours — last 14 days'),
    el('div', { html: lineChart(vals, labs, { h: 150, fmt: v => v + 'h' }) }),
    el('div', { class: 'divider' }),
    el('h3', { style: 'font-size:.85rem' }, 'Consistency (last 17 weeks)'),
    el('div', { html: heatmap(S.sessions) })
  ));

  /* right column */
  const right = el('div', {});

  // exam countdown card
  right.append(el('div', { class: 'card' },
    el('h2', {}, 'Countdown'),
    dte === null
      ? el('div', {},
          el('p', { class: 'small muted' }, 'Set your target exam date to see a live countdown and a pace warning.'),
          el('a', { class: 'btn sm block', href: '#/settings' }, 'Set exam date'))
      : el('div', {},
          el('div', { class: 'stat acc', style: 'border:0;padding:0' },
            el('div', { class: 'v', style: 'font-size:2.4rem' }, dte >= 0 ? `${dte} days` : 'passed'),
            el('div', { class: 'd' }, S.settings.examDate)),
          el('div', { class: 'divider' }),
          el('p', { class: 'small muted', style: 'margin:0' },
            dte > 0 ? `≈ ${Math.round((prog.minsPlanned - prog.minsDone) / 60 / Math.max(1, dte))} h/day needed to finish the remaining plan in time.` : ''))
  ));

  // subject coverage
  const cov = el('div', { class: 'card', style: 'margin-top:16px' }, el('h2', {}, 'Subject coverage'));
  const order = Object.entries(sp).sort((a, b) => b[1].mins - a[1].mins);
  for (const [sid, m] of order) {
    const p = pct(m.done, m.total);
    cov.append(el('div', { style: 'margin-bottom:11px' },
      el('div', { class: 'row between', style: 'font-size:.79rem;margin-bottom:4px' },
        el('span', {}, subjMap[sid]?.short || sid),
        el('span', { class: 'muted' }, `${p}%`)),
      el('div', { class: 'bar ' + (p >= 80 ? 'ok' : p >= 40 ? '' : 'warn'), html: `<i style="width:${p}%"></i>` })
    ));
  }
  right.append(cov);

  /* ---- today's study kit: the book, videos and practice for today's subjects ---- */
  if (day) {
    const kit = el('div', { class: 'card', style: 'margin-top:16px' },
      el('h2', {}, "Today's study kit"),
      el('p', { class: 'small muted' }, 'The book, video course and question set matching what you are studying today. ',
        el('a', { href: '#/curriculum' }, 'See the full curriculum →')));
    left.append(kit);
    const todaySubjects = [...new Set(day.tasks.map(t => t.s))].slice(0, 4);
    Promise.all(todaySubjects.map(async sid => {
      const strip = await resourceStrip(sid, { label: false });
      if (!strip) return null;
      return el('div', { style: 'padding:9px 0;border-top:1px solid var(--line)' },
        el('div', { class: 'xsmall muted', style: 'margin-bottom:5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em' },
          subjMap[sid]?.short || sid),
        strip);
    })).then(rows => {
      const good = rows.filter(Boolean);
      if (good.length) good.forEach(r => kit.append(r)); else kit.remove();
    }).catch(() => kit.remove());
  }

  /* ---- continue reading ---- */
  const reading = Object.entries(S.readerAll)
    .filter(([, r]) => r.name).sort((a, b) => (b[1].updated || 0) - (a[1].updated || 0)).slice(0, 3);
  if (reading.length) {
    const rc = el('div', { class: 'card', style: 'margin-top:16px' },
      el('div', { class: 'row between', style: 'margin-bottom:8px' },
        el('h2', { style: 'margin:0' }, 'Continue reading'),
        el('a', { class: 'link-btn', href: '#/library' }, 'All books')));
    for (const [, r] of reading) {
      const p = r.total ? Math.round((r.page / r.total) * 100) : 0;
      rc.append(el('a', { href: '#/library', style: 'display:block;color:inherit;text-decoration:none;padding:8px 0' },
        el('div', { class: 'row between', style: 'font-size:.82rem;margin-bottom:4px' },
          el('span', {}, r.name.length > 42 ? r.name.slice(0, 40) + '…' : r.name),
          el('span', { class: 'muted xsmall' }, r.total ? `p.${r.page} / ${r.total}` : '')),
        p ? el('div', { class: 'bar', html: `<i style="width:${p}%"></i>` }) : ''));
    }
    right.append(rc);
  }

  // quick actions
  right.append(el('div', { class: 'card', style: 'margin-top:16px' },
    el('h2', {}, 'Jump to'),
    el('div', { class: 'btn-row' },
      el('a', { class: 'btn sm', href: '#/notes' }, '✎ Study material'),
      el('a', { class: 'btn sm', href: '#/library' }, '▣ Book reader'),
      el('a', { class: 'btn sm', href: '#/videos' }, '▶ Video courses'),
      el('a', { class: 'btn sm', href: '#/practice' }, '? Question bank'),
      el('a', { class: 'btn sm', href: '#/flashcards' }, '⚡ Flashcards'),
      el('a', { class: 'btn sm', href: '#/revision' }, '↻ Revision queue'),
      el('a', { class: 'btn sm', href: '#/currentaffairs' }, '◇ Current affairs'))
  ));

  // next 3 days preview
  const nextCard = el('div', { class: 'card', style: 'margin-top:16px' }, el('h2', {}, 'Coming up'));
  const { default: _ } = { default: null };
  const daysMod = await import('../data.js');
  for (let k = 1; k <= 3; k++) {
    const d = await daysMod.getDay(n + k);
    if (!d) break;
    nextCard.append(el('div', { style: 'margin-bottom:10px' },
      el('div', { class: 'row', style: 'gap:8px' },
        el('span', { class: 'pill acc' }, `Day ${d.n}`),
        el('span', { class: 'xsmall muted' }, dateForDay(d.n).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }))),
      el('p', { class: 'xsmall muted', style: 'margin:4px 0 0' },
        d.tasks.slice(0, 3).map(t => t.t.split(':').slice(-1)[0].trim()).join(' · '))
    ));
  }
  right.append(nextCard);

  cols.append(left, right);
  root.append(cols);

  // responsive: single column on small screens
  const mq = window.matchMedia('(max-width:960px)');
  const applyMQ = () => { cols.style.gridTemplateColumns = mq.matches ? 'minmax(0,1fr)' : 'minmax(0,1.55fr) minmax(0,1fr)'; };
  applyMQ(); mq.addEventListener('change', applyMQ);
  const observer=new MutationObserver(()=>{if(!root.isConnected){mq.removeEventListener('change',applyMQ);observer.disconnect();}});observer.observe(document.body,{childList:true,subtree:true});
}
