/* Settings, backup and restore. */
import { el, toast, download, pickFile, confirmBox, hm } from '../util.js';
import { S, todayISO, dateForDay, currentDayNumber } from '../store.js';

export default async function settings(root) {
  root.append(el('div', { class: 'page-head' },
    el('div', { class: 'grow' },
      el('h1', {}, 'Settings & Backup'),
      el('p', { class: 'sub' }, 'Everything you do is stored in this browser. Export a backup regularly — and import it on your phone to carry your progress across.'))));

  const s = S.settings;

  const name = el('input', { class: 'inp', value: s.name || '', placeholder: 'Your name' });
  const start = el('input', { class: 'inp', type: 'date', value: s.startDate });
  const exam = el('input', { class: 'inp', type: 'date', value: s.examDate || '' });
  const hours = el('input', { class: 'inp', type: 'number', min: '1', max: '16', step: '0.5', value: s.dailyHours });

  const preview = el('p', { class: 'small muted', style: 'margin:0' });
  function updatePreview() {
    const d = new Date(start.value + 'T00:00:00');
    const end = new Date(d); end.setDate(end.getDate() + 179);
    preview.textContent = `Day 1 = ${d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · Day 180 = ${end.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}. Today is day ${Math.floor((new Date(todayISO() + 'T00:00:00') - d) / 86400000) + 1}.`;
  }
  start.oninput = updatePreview; updatePreview();

  root.append(el('div', { class: 'card', style: 'margin-bottom:18px' },
    el('h2', {}, 'Your plan'),
    el('div', { class: 'grid g2' },
      el('label', { class: 'fld' }, el('span', {}, 'Name (for the greeting)'), name),
      el('label', { class: 'fld' }, el('span', {}, 'Daily study target (hours)'), hours)),
    el('div', { class: 'grid g2' },
      el('label', { class: 'fld' }, el('span', {}, 'Plan start date — day 1 of 180'), start),
      el('label', { class: 'fld' }, el('span', {}, 'Target exam date (for the countdown)'), exam)),
    preview,
    el('div', { class: 'btn-row', style: 'margin-top:14px' },
      el('button', {
        class: 'btn primary', onclick: () => {
          if(!start.value || !hours.checkValidity() || !Number.isFinite(+hours.value)) { toast('Enter a valid start date and 1–16 daily hours'); return; }
          S.set('settings.name', name.value.trim());
          S.set('settings.startDate', start.value || todayISO());
          S.set('settings.examDate', exam.value || '');
          S.set('settings.dailyHours', +hours.value || 4);
          toast('Saved ✓'); updatePreview();
        }
      }, 'Save settings'),
      el('button', {
        class: 'btn', onclick: () => {
          if (!confirmBox('Reset day 1 to today? Your ticked tasks keep their day numbers, so they will shift relative to the calendar.')) return;
          start.value = todayISO(); S.set('settings.startDate', todayISO()); updatePreview(); toast('Start date set to today');
        }
      }, 'Start the plan today'))));

  /* ---- study time editor ---- */
  const mins = el('input', { class: 'inp', type: 'number', min: '0', step: '15', placeholder: 'e.g. 120' });
  const when = el('input', { class: 'inp', type: 'date', value: todayISO() });
  root.append(el('div', { class: 'card', style: 'margin-bottom:18px' },
    el('h2', {}, 'Log study time manually'),
    el('p', { class: 'small muted' }, 'The timer logs automatically, but add offline study here — reading a physical book, a class, a mock on paper.'),
    el('div', { class: 'row' },
      el('label', { class: 'fld', style: 'margin:0' }, el('span', {}, 'Date'), when),
      el('label', { class: 'fld', style: 'margin:0' }, el('span', {}, 'Minutes'), mins),
      el('button', {
        class: 'btn primary', style: 'margin-top:18px', onclick: () => {
          const m = +mins.value;
          if (!Number.isFinite(m) || m <= 0 || m > 1440) { toast('Enter 1–1440 minutes'); return; }
          S.addMinutes(m, when.value || todayISO());
          toast(`Added ${hm(m)} to ${when.value}`); mins.value = '';
        }
      }, 'Add'))));

  /* ---- backup ---- */
  root.append(el('div', { class: 'card', style: 'margin-bottom:18px' },
    el('h2', {}, 'Backup & transfer between devices'),
    el('p', {class:'small muted'}, 'Import replaces this device’s progress. Export first. Backups include progress and notes, but not locally opened PDF/DOCX files; transfer those separately.'),
    el('p', { class: 'small muted' },
      'This app has no server and no account — which means your data never leaves your device, and also that it does not sync by itself. ',
      'To move progress from laptop to phone: export here, send yourself the file, import it there.'),
    el('div', { class: 'btn-row' },
      el('button', {
        class: 'btn primary', onclick: () => {
          download(`sebi-prep-backup-${todayISO()}.json`, S.export());
          toast('Backup downloaded');
        }
      }, '⬇ Export backup'),
      el('button', {
        class: 'btn', onclick: async () => {
          const f = await pickFile('.json');
          if (!f) return;
          try {
            if (!confirmBox('Replace this device’s progress with this backup? Export first if you want to keep it.')) return;
            S.import(await f.text());
            toast('Restored ✓ — reloading');
            setTimeout(() => location.reload(), 700);
          } catch (e) { toast('Import failed: ' + e.message, 4000); }
        }
      }, '⬆ Import backup'),
      el('button', {
        class: 'btn danger', onclick: () => {
          if (!confirmBox('Erase ALL progress — tasks, notes, sessions, mocks, current affairs? This cannot be undone.')) return;
          if (!confirmBox('Really sure? Export a backup first if you are not.')) return;
          S.reset(); toast('Everything reset'); setTimeout(() => location.reload(), 700);
        }
      }, 'Reset everything')),
    el('p', { class: 'xsmall muted', style: 'margin:12px 0 0' },
      `Current data: ${Object.keys(S.raw.tasks).length} ticked tasks · ${Object.keys(S.sessions).length} study days · ${S.mocks.length} mocks · ${S.ca.length} current-affairs entries · ${Object.keys(S.raw.userNotes).length} personal notes.`)));

  /* ---- offline / install ---- */
  root.append(el('div', { class: 'card', style: 'margin-bottom:18px' },
    el('h2', {}, 'Use it offline / install on your phone'),
    el('p', {class:'small'}, S.m('offlineReady')?'Offline app installed in this browser. Open each PDF once online to cache it too.':'Initial offline download is pending. Stay connected, then revisit this screen.'),
    el('ol', { class: 'small', style: 'padding-left:18px;color:var(--tx2)' },
      el('li', {}, 'Open the site in Chrome on your phone.'),
      el('li', {}, 'Menu ⋮ → ', el('b', {}, '“Add to Home screen”'), ' (on iPhone: Share → “Add to Home Screen”).'),
      el('li', {}, 'Keep the page open while the initial offline download finishes. The status below confirms readiness.'),
      el('li', {}, 'PDFs you open from your phone storage also work offline once the reader has loaded once.'))));

  /* ---- shortcuts ---- */
  root.append(el('div', { class: 'card' },
    el('h2', {}, 'Keyboard shortcuts'),
    el('table', { class: 'tbl' }, el('tbody', {},
      ...[['g then d', 'Dashboard'], ['g then t', "Today's targets"], ['g then r', 'Roadmap'], ['g then n', 'Study material'],
      ['g then l', 'Book reader'], ['g then p', 'Question bank'], ['g then m', 'Mock log'], ['g then a', 'Analytics'],
      ['← / →', 'Previous / next page in the PDF reader'], ['Space', 'Flip a flashcard'], ['1 / 2', 'Grade a flashcard']]
        .map(([k, v]) => el('tr', {}, el('td', {}, el('code', {}, k)), el('td', {}, v)))))));
}
