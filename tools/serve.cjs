const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../dist');
const types = {'.html':'text/html', '.js':'text/javascript', '.mjs':'text/javascript', '.css':'text/css', '.json':'application/json', '.webmanifest':'application/manifest+json', '.svg':'image/svg+xml', '.png':'image/png', '.pdf':'application/pdf', '.md':'text/plain', '.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document'};
http.createServer((req,res) => {
  try {
    let route = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    // Exercise GitHub Pages project-path hosting locally.
    route = route.replace(/^\/SEBIPAPER(?=\/|$)/, '') || '/';
    const file = path.resolve(root, '.' + route + (route.endsWith('/') ? 'index.html' : ''));
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache'});
    fs.createReadStream(file).pipe(res);
  } catch { res.writeHead(400); res.end('Bad request'); }
}).listen(4173,'127.0.0.1', () => console.log('Study hub: http://127.0.0.1:4173/SEBIPAPER/'));
