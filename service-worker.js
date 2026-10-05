const CACHE='tripwise-v11';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./mexico.png','./guatemala.png','./japan.png','./thailand.png','./vietnam.png','./italy.png','./tesseract.min.js','./worker.min.js','./tesseract-core-simd.wasm.js','./tesseract-core-simd.wasm','./eng.traineddata.gz'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(e.request.method==='GET'&&r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match('./index.html')))));
