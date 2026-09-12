/* Splits data/notes/_bundle*.txt into individual .md note files.
   Bundle format:  @@FILE note-id
                   ...markdown...
   Run: node tools/split-notes.js */
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'data', 'notes');

let written = 0;
for (const f of fs.readdirSync(dir).filter(f => /^_bundle.*\.txt$/.test(f))) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8');
  const parts = raw.split(/^@@FILE[ \t]+(.+)$/m);
  for (let i = 1; i < parts.length; i += 2) {
    const id = parts[i].trim();
    const body = parts[i + 1].replace(/^\n+/, '').replace(/\s+$/, '') + '\n';
    fs.writeFileSync(path.join(dir, id + '.md'), body);
    written++;
  }
  fs.unlinkSync(path.join(dir, f));
}
console.log(`${written} note files written.`);
