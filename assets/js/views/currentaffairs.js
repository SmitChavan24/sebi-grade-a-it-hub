/* Current affairs log — the habit that wins Paper 1 and the interview. */
import { el, toast, fmtDate, download, confirmBox, md } from '../util.js';
import { S, todayISO } from '../store.js';

const TAGS = ['SEBI', 'Markets', 'RBI / Banking', 'Economy', 'Technology', 'Cyber / IT', 'International', 'Schemes', 'Appointments', 'Reports & Indices'];

const SOURCES = [
  { n: 'SEBI — Press Releases', u: 'https://www.sebi.gov.in/media-and-notifications/press-releases', d: 'The primary source. Skim daily, read anything about your stream.' },
  { n: 'SEBI — Circulars', u: 'https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=7&smid=0', d: 'Read one fully per week — cite it in the interview.' },
  { n: 'SEBI — Orders', u: 'https://www.sebi.gov.in/enforcement/orders', d: 'Enforcement orders show how the regulations actually bite.' },
  { n: 'SEBI — Annual Report', u: 'https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doValue=yes&type=1', d: 'One read of the latest report is worth a month of coaching notes.' },
  { n: 'RBI — Press Releases', u: 'https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx', d: 'Monetary policy, payment systems, cyber directions.' },
  { n: 'PIB', u: 'https://www.pib.gov.in/', d: 'Government schemes and announcements, sanitised of spin.' },
  { n: 'CERT-In', u: 'https://www.cert-in.org.in/', d: 'Cyber advisories and directions — directly relevant to the IT stream.' },
  { n: 'MeitY', u: 'https://www.meity.gov.in/', d: 'IT Act, DPDP rules, data-centre and cloud policy.' }
];

export default async function currentaffairs(root) {
  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, 'Current Affairs Log'),
      el('p', { class: 'sub' }, 'Six months before the exam is the window that matters. One entry a day beats a 400-page PDF in the last week.')),
    el('div', { class: 'btn-row' },
      el('button', {
        class: 'btn sm', onclick: () => {
          const byMonth = {};
          S.ca.forEach(c => (byMonth[c.d.slice(0, 7)] ||= []).push(c));
          let out = '# Current Affairs Compilation\n\n';
          Object.entries(byMonth).sort((a, b) => b[0].localeCompare(a[0])).forEach(([m, arr]) => {
            out += `\n## ${m}\n\n`;
            arr.forEach(c => { out += `### ${c.title}\n_${c.d} · ${(c.tags || []).join(', ')}_\n\n${c.body || ''}\n\n`; });
          });
          download('current-affairs-compilation.md', out, 'text/markdown');
        }
      }, '⬇ Export compilation'))
  ));

  /* ---- entry form ---- */
  const title = el('input', { class: 'inp', placeholder: 'Headline in your own words — e.g. “SEBI extends CSCRF compliance deadline for mid-size REs”' });
  const bodyIn = el('textarea', { class: 'inp', placeholder: 'What happened, why it matters, and the one line you would say in an interview. Markdown works.' });
  const date = el('input', { class: 'inp', type: 'date', value: todayISO() });
  const tagWrap = el('div', { class: 'row', style: 'gap:6px' });
  const picked = new Set();
  TAGS.forEach(t => {
    const b = el('button', { class: 'btn sm ghost' }, t);
    b.onclick = () => { picked.has(t) ? picked.delete(t) : picked.add(t); b.className = 'btn sm ' + (picked.has(t) ? 'primary' : 'ghost'); };
    tagWrap.append(b);
  });

  root.append(el('div', { class: 'card', style: 'margin-bottom:18px' },
    el('h2', {}, "Today's entry"),
    el('label', { class: 'fld' }, el('span', {}, 'Headline'), title),
    el('label', { class: 'fld' }, el('span', {}, 'Your summary'), bodyIn),
    el('label', { class: 'fld' }, el('span', {}, 'Tags'), tagWrap),
    el('div', { class: 'row' }, el('label', { class: 'fld', style: 'margin:0' }, el('span', {}, 'Date'), date),
      el('span', { class: 'spacer', style: 'flex:1' }),
      el('button', {
        class: 'btn primary', onclick: () => {
          if (!title.value.trim()) { toast('Add a headline'); return; }
          S.addCA({ d: date.value || todayISO(), title: title.value.trim(), body: bodyIn.value.trim(), tags: [...picked] });
          title.value = ''; bodyIn.value = ''; picked.clear();
          [...tagWrap.children].forEach(b => b.className = 'btn sm ghost');
          toast('Logged ✓'); paint();
        }
      }, 'Add entry'))));

  /* ---- sources ---- */
  const src = el('div', { class: 'card', style: 'margin-bottom:18px' },
    el('h2', {}, 'Where to read from'),
    el('p', { class: 'small muted' }, 'Primary sources only. Coaching compilations are for revision, never for first reading.'));
  const sg = el('div', { class: 'grid g-auto' });
  SOURCES.forEach(s => sg.append(el('a', { class: 'note-card', href: s.u, target: '_blank', rel: 'noopener', style: 'color:inherit;text-decoration:none' },
    el('h4', {}, s.n), el('p', {}, s.d))));
  src.append(sg);
  root.append(src);

  const body = el('div', {});
  root.append(body);

  function paint() {
    body.innerHTML = '';
    const list = S.ca;
    const streakDays = new Set(list.map(c => c.d)).size;

    body.append(el('div', { class: 'grid g4', style: 'margin-bottom:18px' },
      stat('Entries', String(list.length), 'total logged', 'acc'),
      stat('Days covered', String(streakDays), 'unique dates', 'ok'),
      stat('This month', String(list.filter(c => c.d.startsWith(todayISO().slice(0, 7))).length), todayISO().slice(0, 7), 'pur'),
      stat('SEBI-tagged', String(list.filter(c => (c.tags || []).includes('SEBI')).length), 'the ones that matter most', 'warn')));

    if (!list.length) {
      body.append(el('div', { class: 'empty' }, el('div', { class: 'big' }, '📰'),
        el('h2', {}, 'Start today'),
        el('p', { class: 'small muted' }, 'Open SEBI press releases, pick one item, write three lines. That is the whole habit.')));
      return;
    }

    const filterSel = el('select', { class: 'sel sm' }, el('option', { value: '' }, 'All tags'), ...TAGS.map(t => el('option', { value: t }, t)));
    const search = el('input', { class: 'inp', placeholder: 'Search your log…', style: 'max-width:260px' });
    const listHost = el('div', {});
    body.append(el('div', { class: 'row', style: 'margin-bottom:12px' }, search, filterSel), listHost);

    function drawList() {
      listHost.innerHTML = '';
      const q = search.value.trim().toLowerCase();
      const f = list.filter(c =>
        (!filterSel.value || (c.tags || []).includes(filterSel.value)) &&
        (!q || (c.title + ' ' + (c.body || '')).toLowerCase().includes(q)));
      const byMonth = {};
      f.forEach(c => (byMonth[c.d.slice(0, 7)] ||= []).push(c));
      Object.entries(byMonth).sort((a, b) => b[0].localeCompare(a[0])).forEach(([m, arr]) => {
        const card = el('div', { class: 'card', style: 'margin-bottom:14px' },
          el('div', { class: 'row between', style: 'margin-bottom:8px' },
            el('h2', { style: 'margin:0' }, new Date(m + '-01T00:00:00').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })),
            el('span', { class: 'pill acc' }, `${arr.length} entries`)));
        arr.forEach(c => card.append(el('div', { style: 'padding:10px 0;border-top:1px solid var(--line)' },
          el('div', { class: 'row between' },
            el('b', { style: 'font-size:.9rem' }, c.title),
            el('button', { class: 'icon-btn sm', onclick: () => { if (confirmBox('Delete this entry?')) { S.delCA(c.id); paint(); } } }, '✕')),
          el('div', { class: 'row', style: 'gap:6px;margin:4px 0' },
            el('span', { class: 'xsmall muted' }, fmtDate(c.d)),
            ...(c.tags || []).map(t => el('span', { class: 'pill' }, t))),
          c.body ? el('div', { class: 'md small', html: md(c.body) }) : '')));
        listHost.append(card);
      });
      if (!f.length) listHost.append(el('div', { class: 'empty small' }, 'Nothing matches.'));
    }
    search.oninput = drawList; filterSel.onchange = drawList;
    drawList();
  }
  paint();
}

const stat = (k, v, d, c) => el('div', { class: 'stat ' + c }, el('div', { class: 'k' }, k), el('div', { class: 'v' }, v), el('div', { class: 'd' }, d));
