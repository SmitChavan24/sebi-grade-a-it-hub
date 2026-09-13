/* ============================================================
   resources.js — the connective tissue.

   One place that answers: "for this subject, which note, which book,
   which video course and which practice set?" Every view uses it, so
   Study Material, Book Reader, Video Courses and the Question Bank all
   agree and link to each other.
   ============================================================ */
import { el, getJSON } from './util.js';
import { loadLibrary, loadNotesIdx } from './data.js';

export const loadVideos = () => getJSON('data/videos.json').catch(() => ({ groups: [], howto: [] }));

/* Subjects whose notes share another subject's video group / practice pool. */
const VIDEO_FOR = {
  ga: 'markets', 'it-fin': 'markets', intv: 'sebi', resources: 'sebi',
  eng: 'paper1', qa: 'paper1', reas: 'paper1', engd: 'paper1',
  'it-data': 'it-prog', 'it-shell': 'it-os', 'it-descriptive': 'it-sec',
  'it-cloud': 'it-sec', 'it-web': 'it-sec'
};

/* Video-group ids that are not subject ids, mapped back to the subject
   whose notes, books and questions belong with them. */
const SUBJECT_FOR_GROUP = { markets: 'ga', sebi: 'ga', paper1: 'qa' };

let cache = null;
async function index() {
  if (cache) return cache;
  const [shelf, videos, notesIdx] = await Promise.all([loadLibrary(), loadVideos(), loadNotesIdx()]);
  const booksBySubject = {};
  for (const b of shelf.books || []) {
    if (!b.sid) continue;
    for (const sid of [].concat(b.sid)) (booksBySubject[sid] ||= []).push(b);
  }
  const videoById = Object.fromEntries((videos.groups || []).map(g => [g.id, g]));
  const notesBySubject = {};
  for (const n of notesIdx.notes || []) (notesBySubject[n.subject] ||= []).push(n);
  cache = { shelf, videos, booksBySubject, videoById, notesBySubject };
  return cache;
}

/** Everything available for one subject id. */
export async function resourcesFor(subject) {
  const { booksBySubject, videoById, notesBySubject } = await index();
  return {
    books: booksBySubject[subject] || [],
    video: videoById[VIDEO_FOR[subject] || subject] || null,
    notes: notesBySubject[subject] || []
  };
}

/**
 * A row of buttons linking the four surfaces for one subject.
 * `skip` omits whichever surface the caller is already on.
 */
export async function resourceStrip(subjectOrGroup, { skip = '', label = true } = {}) {
  const subject = SUBJECT_FOR_GROUP[subjectOrGroup] || subjectOrGroup;
  const r = await resourcesFor(subject);
  const row = el('div', { class: 'btn-row', style: 'margin-top:6px' });

  if (skip !== 'notes' && r.notes.length)
    row.append(el('a', { class: 'btn sm', href: `#/notes?s=${encodeURIComponent(subject)}` },
      `✎ ${r.notes.length} note${r.notes.length > 1 ? 's' : ''}`));

  if (skip !== 'library' && r.books.length)
    row.append(el('a', { class: 'btn sm', href: `#/library/${r.books[0].id}`, title: r.books[0].title },
      `▣ ${r.books.length > 1 ? r.books.length + ' books' : 'Book'}`));

  if (skip !== 'videos' && r.video)
    row.append(el('a', { class: 'btn sm', href: `#/videos/${r.video.id}` }, '▶ Videos'));

  if (skip !== 'practice')
    row.append(el('a', { class: 'btn sm', href: `#/practice?s=${encodeURIComponent(subject)}` }, '? Practice'));

  if (!row.children.length) return null;
  if (label) row.prepend(el('span', { class: 'xsmall muted', style: 'align-self:center;margin-right:4px' }, 'Go deeper:'));
  return row;
}

/** Books for a subject, as cards — used on the note page. */
export async function bookCardsFor(subject) {
  const { books } = await resourcesFor(subject);
  if (!books.length) return null;
  const grid = el('div', { class: 'note-list' });
  for (const b of books) {
    grid.append(el('a', { class: 'note-card', href: `#/library/${b.id}`, style: 'color:inherit;text-decoration:none' },
      el('h4', {}, b.title),
      el('p', {}, b.author ? b.author + ' — ' + (b.desc || '') : (b.desc || '')),
      el('span', { class: 'pill ok' }, 'Read in the app')));
  }
  return grid;
}
