const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname,'..');
const out = path.join(root,'dist');
fs.mkdirSync(out,{recursive:true});
for (const name of ['assets','data','library','index.html','manifest.webmanifest']) fs.cpSync(path.join(root,name),path.join(out,name),{recursive:true});
fs.writeFileSync(path.join(out,'.nojekyll'),'');
const vendor = path.join(out,'assets/vendor');
fs.mkdirSync(vendor,{recursive:true});
for (const [src,dest] of [
  ['pdfjs-dist/build/pdf.mjs','pdf.mjs'], ['pdfjs-dist/build/pdf.worker.mjs','pdf.worker.mjs'],
  ['mammoth/mammoth.browser.min.js','mammoth.min.js'], ['dompurify/dist/purify.min.js','purify.min.js']
]) fs.copyFileSync(path.join(root,'node_modules',src),path.join(vendor,dest));
for (const name of ['cmaps','standard_fonts','wasm']) fs.cpSync(path.join(root,'node_modules/pdfjs-dist',name),path.join(vendor,name),{recursive:true});
function walk(dir) { return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]); }
const files=walk(out).filter(f=>!f.endsWith('sw.js'));
const version=crypto.createHash('sha256');
for (const f of files.sort()) version.update(fs.readFileSync(f));
const core=files.filter(f=>!f.includes(path.sep+'library'+path.sep)||!f.endsWith('.pdf')).map(f=>'./'+path.relative(out,f).split(path.sep).join('/'));
const sw=fs.readFileSync(path.join(root,'tools/sw-template.js'),'utf8').replace('__VERSION__',version.digest('hex').slice(0,12)).replace('__CORE__',JSON.stringify(core));
fs.writeFileSync(path.join(out,'sw.js'),sw);
console.log(`Built ${files.length+1} files; ${core.length} precached resources. PDFs cached when opened.`);
