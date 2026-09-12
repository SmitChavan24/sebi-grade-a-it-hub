/* Flashcards — fast recall drilling with Leitner boxes. */
import { el, shuffle, toast, md } from '../util.js';
import { S, todayISO } from '../store.js';
import { loadFlashcards, subjects } from '../data.js';

export default async function flashcards(root, ctx) {
  const [deck, subjMap] = await Promise.all([loadFlashcards(), subjects()]);
  const cards = deck.cards;

  const bySubject = {};
  cards.forEach(c => (bySubject[c.s] ||= []).push(c));

  const today = todayISO();
  const dueAll = cards.filter(c => S.card(c.id).due <= today);

  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, 'Flashcards'),
      el('p', { class: 'sub' }, `${cards.length} cards · ${dueAll.length} due today. Tap the card to flip, then grade yourself honestly.`))
  ));

  const startSet = ctx?.params?.[0];
  if (startSet === 'due') return run(root, shuffle(dueAll), subjMap);

  root.append(el('div', { class: 'grid g4', style: 'margin-bottom:18px' },
    st('Due today', String(dueAll.length), 'clear these first', dueAll.length ? 'warn' : 'ok'),
    st('Total cards', String(cards.length), 'in the deck', 'acc'),
    st('Mastered', String(cards.filter(c => S.card(c.id).box >= 4).length), 'box 4 or 5', 'ok'),
    st('Struggling', String(cards.filter(c => S.card(c.id).seen > 1 && S.card(c.id).box === 1).length), 'back in box 1', 'bad')));

  if (dueAll.length) {
    root.append(el('div', { class: 'card', style: 'margin-bottom:16px' },
      el('div', { class: 'row between' },
        el('div', {}, el('h2', { style: 'margin:0' }, `${dueAll.length} cards due`),
          el('p', { class: 'small muted', style: 'margin:4px 0 0' }, '10 minutes of this beats an hour of re-reading.')),
        el('button', { class: 'btn primary', onclick: () => { root.innerHTML = ''; run(root, shuffle(dueAll), subjMap); } }, 'Start drill →'))));
  }

  const grid = el('div', { class: 'grid g-auto' });
  Object.entries(bySubject).forEach(([sid, arr]) => {
    const due = arr.filter(c => S.card(c.id).due <= today).length;
    const card = el('div', { class: 'note-card' },
      el('h4', {}, subjMap[sid]?.short || sid),
      el('p', {}, `${arr.length} cards · ${due} due`),
      el('div', { class: 'bar', html: `<i style="width:${Math.round((arr.filter(c => S.card(c.id).box >= 3).length / arr.length) * 100)}%"></i>` }));
    card.onclick = () => { root.innerHTML = ''; run(root, shuffle(arr), subjMap); };
    grid.append(card);
  });
  root.append(el('div', { class: 'card' }, el('h2', {}, 'Drill by subject'), grid));
}

function run(root, queue, subjMap) {
  if (!queue.length) {
    root.append(el('div', { class: 'empty' }, el('div', { class: 'big' }, '✅'),
      el('h2', {}, 'Nothing due'),
      el('p', { class: 'small muted' }, 'Come back tomorrow, or drill a subject deck manually.'),
      el('a', { class: 'btn primary', href: '#/flashcards' }, 'Back')));
    return;
  }
  let i = 0, right = 0;
  const head = el('div', { class: 'page-head' });
  const holder = el('div', {});
  const actions = el('div', { class: 'row', style: 'gap:8px;justify-content:center' });
  root.append(head, holder, actions);

  function paint() {
    if (i >= queue.length) {
      root.innerHTML = '';
      root.append(el('div', { class: 'empty' },
        el('div', { class: 'big' }, right / queue.length > .7 ? '🎯' : '📚'),
        el('h2', {}, `${right} of ${queue.length} recalled`),
        el('p', { class: 'small muted' }, 'Cards you forgot are back tomorrow; the rest move to a longer interval.'),
        el('div', { class: 'btn-row', style: 'justify-content:center' },
          el('a', { class: 'btn primary', href: '#/flashcards' }, 'Flashcards home'),
          el('a', { class: 'btn', href: '#/today' }, "Today's targets"))));
      return;
    }
    const c = queue[i];
    head.innerHTML = '';
    head.append(el('div', { class: 'grow' },
      el('h1', { style: 'font-size:1.1rem' }, 'Flashcard drill'),
      el('p', { class: 'sub' }, `${i + 1} of ${queue.length} · ${subjMap[c.s]?.short || c.s} · box ${S.card(c.id).box}`)));

    holder.innerHTML = '';
    const fc = el('div', { class: 'fc' },
      el('div', { class: 'fc-in' },
        el('div', { class: 'fc-f' }, el('b', {}, c.q)),
        el('div', { class: 'fc-b', html: md(c.a) })));
    fc.onclick = () => { fc.classList.toggle('flip'); actions.style.visibility = 'visible'; };
    holder.append(fc, el('p', { class: 'small muted', style: 'text-align:center' }, 'Tap the card to reveal the answer'));

    actions.innerHTML = '';
    actions.style.visibility = 'hidden';
    actions.append(
      el('button', { class: 'btn danger', onclick: () => { S.gradeCard(c.id, false); i++; paint(); } }, 'Forgot'),
      el('button', { class: 'btn ok', onclick: () => { S.gradeCard(c.id, true); right++; i++; paint(); } }, 'Knew it'));
  }
  paint();

  const k = e => {
    if (e.target.matches('input,textarea')) return;
    if (e.key === ' ') { e.preventDefault(); root.querySelector('.fc')?.classList.toggle('flip'); actions.style.visibility = 'visible'; }
    if (actions.style.visibility === 'hidden') return;
    if (e.key === '1') actions.children[0]?.click();
    if (e.key === '2') actions.children[1]?.click();
  };
  document.addEventListener('keydown', k);
  new MutationObserver((m, o) => { if (!document.body.contains(holder)) { document.removeEventListener('keydown', k); o.disconnect(); } })
    .observe(document.body, { childList: true, subtree: true });
}

const st = (k, v, d, c) => el('div', { class: 'stat ' + c }, el('div', { class: 'k' }, k), el('div', { class: 'v' }, v), el('div', { class: 'd' }, d));
