const PREFIX = 'sebi-study-' + new URL(self.registration.scope).pathname + '-';
const CACHE = PREFIX + '__VERSION__';
const BOOKS = PREFIX + 'books';
const CORE = __CORE__;
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(async cache => {
  // Batches prevent hundreds of simultaneous requests on mobile connections.
  for(let i=0;i<CORE.length;i+=12) await cache.addAll(CORE.slice(i,i+12));
  if (self.location.hostname === '127.0.0.1' || self.location.hostname === 'localhost') await self.skipWaiting();
})));
self.addEventListener('activate', event => event.waitUntil((async()=>{
  for (const key of await caches.keys()) if(key.startsWith(PREFIX)&&key!==CACHE&&key!==BOOKS) await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  const u = new URL(event.request.url);
  if(event.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  event.respondWith((async()=>{
    const cache=await caches.open(u.pathname.endsWith('.pdf')?BOOKS:CACHE);
    const key=event.request.mode==='navigate'?new URL('index.html',self.registration.scope).href:event.request;
    const cached=await cache.match(key);
    if(cached) return cached;
    try {
      const response=await fetch(event.request);
      if(response.ok&&response.status===200) try { await cache.put(key,response.clone()); } catch { /* Reading still works when cache storage is full. */ }
      return response;
    } catch { return new Response('This file is not saved offline yet. Open it once while connected.',{status:503}); }
  })());
});
