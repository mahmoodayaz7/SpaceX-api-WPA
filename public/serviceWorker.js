

const cacheName = 'v1';

/*
const cacheAssets = [
  'serviceRegister.js',

  '/index.html',
  '/static/js/bundle.js',
  '/static/js/1.chunk.js',
  '/static/js/main.chunk.js',
  '/App.js',
  '/',


];
*/



const cacheAssets1 = [
  '/',
  './index.html',
  './static/js/2.262e9952.chunk.js',
  './static/js/main.533a7662.chunk.js',
  './static/js/runtime-main.81435ab8.js',
  './static/js/2.262e9952.chunk.js.LICENSE.txt',
  './static/js/2.262e9952.chunk.js.map',
  './static/js/main.533a7662.chunk.js.map',
  './static/js/runtime-main.81435ab8.js.map',
  './static/css/2.11829350.chunk.css',
  './static/css/2.11829350.chunk.css.map',
  './static/css/main.01065305.chunk.css',
  './static/css/main.01065305.chunk.css.map',
  './static/media/no_image_available.1c98fa4a.jpeg',
  './asset-manifest.json',
  './manifest.json',
  './robots.txt',
  './manifest.4c5ae47d75e57ab615d5e0b5788b8a7b.js',
  './serviceWorker.js',
  './service-worker.js'
 ];



 const cacheAssets = [
  '/',
  './index.html',
  './static/js/2.262e9952.chunk.js',
  './static/js/main.533a7662.chunk.js',
  './static/css/2.11829350.chunk.css',
  './static/css/main.01065305.chunk.css',

 ];








 self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});









self.addEventListener('fetch', function(event) {
  if (!navigator.onLine){
    event.respondWith(
      caches.match(event.request).then((result)=>{
        console.log('results',result);
        if (result){
          return result;

        }
      })
    )
  }
})




