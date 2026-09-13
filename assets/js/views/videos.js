/* Video courses — curated YouTube channels per subject. */
import { el, getJSON, toast } from '../util.js';
import { S } from '../store.js';
import { resourceStrip } from '../resources.js';

export default async function videos(root, ctx = {}) {
  const data = await getJSON('data/videos.json');

  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, 'Video Courses'),
      el('p', { class: 'sub' }, 'Free YouTube teaching for every subject, chosen for this syllabus. Use video to understand, notes to revise.'))));

  /* how to use video without wasting the day */
  root.append(el('section', { class: 'card', style: 'margin-bottom:18px;border-left:3px solid var(--warn)' },
    el('h2', {}, 'Read this before you binge'),
    el('ol', { class: 'small', style: 'margin:0;padding-left:18px;color:var(--tx2)' },
      ...data.howto.map(h => el('li', { style: 'margin-bottom:5px' }, h)))));

  /* search + subject filter */
  const search = el('input', { class: 'inp', placeholder: 'Search channels and subjects…', style: 'max-width:320px' });
  const tabs = el('div', { class: 'tabs' });
  const host = el('div', {});
  root.append(el('div', { class: 'row', style: 'margin-bottom:12px' }, search), tabs, host);

  let active = ctx.params?.[0] || 'all';

  function paint() {
    tabs.replaceChildren();
    const mk = (id, label) => el('button', { class: active === id ? 'on' : '', onclick: () => { active = id; paint(); } }, label);
    tabs.append(mk('all', 'All'), ...data.groups.map(g => mk(g.id, g.name.split(' — ')[0].split(' & ')[0].split(',')[0])));

    const q = search.value.trim().toLowerCase();
    const groups = data.groups
      .filter(g => active === 'all' || g.id === active)
      .map(g => ({ ...g, items: g.items.filter(i => !q || (i.t + ' ' + i.d + ' ' + i.ch + ' ' + g.name).toLowerCase().includes(q)) }))
      .filter(g => g.items.length);

    host.replaceChildren();
    if (!groups.length) { host.append(el('div', { class: 'empty' }, el('div', { class: 'big' }, '🔍'), 'Nothing matches that search.')); return; }

    for (const g of groups) {
      const grid = el('div', { class: 'note-list' });
      for (const i of g.items) {
        const watchedKey = 'vid:' + g.id + ':' + i.t;
        const done = !!S.m(watchedKey);
        const card = el('div', { class: 'note-card' + (done ? ' done' : '') },
          el('h4', {}, i.t),
          el('p', {}, i.d),
          el('div', { class: 'row', style: 'gap:6px' },
            el('span', { class: 'pill acc' }, i.ch),
            i.lang ? el('span', { class: 'pill' }, i.lang) : ''),
          el('div', { class: 'btn-row', style: 'margin-top:8px' },
            el('a', { class: 'btn sm primary', href: i.u, target: '_blank', rel: 'noopener' }, '▶ Channel'),
            i.s ? el('a', { class: 'btn sm', href: i.s, target: '_blank', rel: 'noopener' }, 'Find the playlist') : '',
            el('button', {
              class: 'btn sm ghost',
              onclick: e => {
                const now = !S.m(watchedKey);
                S.m(watchedKey, now || undefined);
                e.target.textContent = now ? '✓ Started' : 'Mark started';
                card.classList.toggle('done', now);
                toast(now ? 'Marked as started' : 'Unmarked');
              }
            }, done ? '✓ Started' : 'Mark started')));
        grid.append(card);
      }
      const section = el('section', { class: 'card', style: 'margin-bottom:18px' },
        el('h2', {}, g.name),
        g.note ? el('p', { class: 'small muted' }, g.note) : '',
        grid);
      host.append(section);
      resourceStrip(g.id, { skip: 'videos' }).then(strip => { if (strip) section.append(strip); });
    }
  }

  search.oninput = paint;
  paint();

  root.append(el('section', { class: 'card' },
    el('h2', {}, 'A word on coaching videos'),
    el('p', { class: 'small muted', style: 'margin:0' },
      'Coaching channels are useful for exam strategy and for hearing a topic explained out loud. They are not a source of truth for regulation — ',
      'a video recorded two years ago may describe a circular that has since been amended. For anything SEBI-specific, confirm against ',
      el('a', { href: 'https://www.sebi.gov.in/', target: '_blank', rel: 'noopener' }, 'sebi.gov.in'),
      ' before you write it in an answer or say it in the interview.')));
}
