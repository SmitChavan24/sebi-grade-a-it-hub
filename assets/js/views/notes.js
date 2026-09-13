/* Study material — curated notes for every syllabus topic, plus your own notes. */
import { el, esc, md, getText, toast, download } from '../util.js';
import { S } from '../store.js';
import { loadNotesIdx, subjects } from '../data.js';
import { resourceStrip, bookCardsFor } from '../resources.js';

export default async function notes(root, ctx) {
  const [idx, subjMap] = await Promise.all([loadNotesIdx(), subjects()]);
  const id = ctx?.params?.[0];
  if (id) return renderNote(root, idx, subjMap, id);

  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, 'Study Material'),
      el('p', { class: 'sub' }, `${idx.notes.length} topic notes written for this syllabus — read them online, on your phone, or print them.`))
  ));

  const search = el('input', { class: 'inp', placeholder: 'Search topics, e.g. “deadlock”, “SEBI Act”, “TCP”, “normalisation”…', style: 'margin-bottom:14px' });
  root.append(search);

  const tabs = el('div', { class: 'tabs' });
  const host = el('div', {});
  root.append(tabs, host);

  const groups = [...new Set(idx.notes.map(n => n.subject))];
  let active = ctx?.query?.get('s') || 'all';

  function paint() {
    tabs.innerHTML = '';
    const mk = (k, l, n) => el('button', { class: active === k ? 'on' : '', onclick: () => { active = k; paint(); } }, `${l}${n != null ? ` (${n})` : ''}`);
    tabs.append(mk('all', 'All', idx.notes.length));
    groups.forEach(g => tabs.append(mk(g, subjMap[g]?.short || g, idx.notes.filter(n => n.subject === g).length)));

    const q = search.value.trim().toLowerCase();
    const list = idx.notes.filter(n =>
      (active === 'all' || n.subject === active) &&
      (!q || (n.title + ' ' + (n.desc || '') + ' ' + (n.tags || []).join(' ')).toLowerCase().includes(q)));

    host.innerHTML = '';
    if (!list.length) { host.append(el('div', { class: 'empty' }, el('div', { class: 'big' }, '🔍'), 'No notes match that search.')); return; }

    const bySubject = {};
    list.forEach(n => (bySubject[n.subject] ||= []).push(n));
    for (const [sid, arr] of Object.entries(bySubject)) {
      host.append(el('h2', { style: 'margin:20px 0 10px;font-size:1rem;color:var(--tx2)' }, subjMap[sid]?.name || sid));
      const grid = el('div', { class: 'note-list' });
      arr.forEach(n => {
        const mine = S.userNote(n.id);
        grid.append(el('a', { class: 'note-card', href: `#/notes/${n.id}`, style: 'color:inherit;text-decoration:none' },
          el('h4', {}, n.title),
          el('p', {}, n.desc || ''),
          el('div', { class: 'row', style: 'gap:6px;margin-top:auto;padding-top:6px' },
            el('span', { class: 'pill' }, `${n.mins || 15} min read`),
            mine ? el('span', { class: 'pill ok' }, '✎ your notes') : '')));
      });
      host.append(grid);
    }
  }
  search.oninput = paint;
  paint();
}

async function renderNote(root, idx, subjMap, id) {
  const meta = idx.notes.find(n => n.id === id);
  if (!meta) {
    root.append(el('div', { class: 'empty' }, el('div', { class: 'big' }, '📄'),
      el('h2', {}, 'Note not found'),
      el('p', { class: 'small muted' }, `No note with id “${esc(id)}”. It may not be written yet — you can add your own below.`),
      el('a', { class: 'btn', href: '#/notes' }, '← All study material')));
    root.append(userNoteBox(id));
    return;
  }

  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('a', { class: 'link-btn', href: '#/notes' }, '← Study material'),
      el('h1', { style: 'margin-top:6px' }, meta.title),
      el('p', { class: 'sub' }, `${subjMap[meta.subject]?.name || meta.subject} · ${meta.mins || 15} min read`)),
    el('div', { class: 'btn-row' },
      el('button', { class: 'btn sm', onclick: () => window.print() }, '🖨 Print / PDF'))
  ));

  const body = el('div', { class: 'card' }, el('p', { class: 'muted' }, 'Loading…'));
  root.append(body);
  try {
    const text = await getText(`data/notes/${id}.md`);
    body.innerHTML = '';
    body.append(el('article', { class: 'md', html: md(text) }));
  } catch (e) {
    body.innerHTML = '';
    body.append(el('p', { class: 'muted' }, 'Could not load this note: ' + e.message));
  }

  // everything else on this subject: book, videos, practice
  const deeper = el('div', { class: 'card', style: 'margin-top:16px' },
    el('h2', {}, 'Go deeper on ' + (subjMap[meta.subject]?.short || meta.subject)));
  root.append(deeper);
  Promise.all([bookCardsFor(meta.subject), resourceStrip(meta.subject, { skip: 'notes', label: false })])
    .then(([cards, strip]) => {
      if (!cards && !strip) { deeper.remove(); return; }
      deeper.append(el('p', { class: 'small muted' },
        'Read the note first, then use these when a point will not click — and always finish with the practice set.'));
      if (cards) deeper.append(cards);
      if (strip) deeper.append(strip);
    })
    .catch(() => deeper.remove());

  root.append(userNoteBox(id));

  // related notes
  const related = idx.notes.filter(n => n.subject === meta.subject && n.id !== id).slice(0, 6);
  if (related.length) {
    const rc = el('div', { class: 'card', style: 'margin-top:16px' }, el('h2', {}, 'More in ' + (subjMap[meta.subject]?.short || meta.subject)));
    const grid = el('div', { class: 'note-list' });
    related.forEach(n => grid.append(el('a', { class: 'note-card', href: `#/notes/${n.id}`, style: 'color:inherit;text-decoration:none' },
      el('h4', {}, n.title), el('p', {}, n.desc || ''))));
    rc.append(grid);
    root.append(rc);
  }
}

function userNoteBox(id) {
  const ta = el('textarea', { class: 'inp', style: 'min-height:150px', placeholder: 'Write your own notes, mnemonics, doubts, or exam-day one-liners here. Markdown works. Saved automatically on this device and included in your backup file.' });
  ta.value = S.userNote(id);
  let t = null;
  ta.oninput = () => { S.setUserNote(id, ta.value); status.textContent = "Saved on this device"; };
  const status = el('span', { class: 'xsmall muted' }, '');
  return el('div', { class: 'card', style: 'margin-top:16px' },
    el('div', { class: 'row between', style: 'margin-bottom:8px' },
      el('h2', { style: 'margin:0' }, '✎ Your notes on this topic'), status),
    ta);
}
