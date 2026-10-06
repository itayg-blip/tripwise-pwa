const CACHE='tripwise-v21';
const CORE=[
  './','./index.html','./manifest.webmanifest','./icon.svg',
  './firebase-config.js','./firebase-app-compat.js','./firebase-auth-compat.js','./firebase-firestore-compat.js',
  './google-sans-400.ttf','./google-sans-500.ttf','./google-sans-700.ttf',
  './mexico.png','./guatemala.png','./japan.png','./thailand.png','./vietnam.png','./italy.png',
  './tesseract.min.js','./worker.min.js','./eng.traineddata.gz',
  './tesseract-core-lstm.wasm.js','./tesseract-core-lstm.wasm',
  './tesseract-core-simd-lstm.wasm.js','./tesseract-core-simd-lstm.wasm'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
    .then(()=>self.clients.claim()));
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  if(request.mode==='navigate'){
    event.respondWith(fetch(request).then(response=>{
      if(response.ok)caches.open(CACHE).then(cache=>cache.put('./index.html',response.clone()));
      return response;
    }).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{
    if(response.ok)caches.open(CACHE).then(cache=>cache.put(request,response.clone()));
    return response;
  })));
});
