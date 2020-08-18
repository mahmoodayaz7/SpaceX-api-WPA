

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




 const cacheAssets = [
  './',
  './rockets',
  './ships',
  './missions',
  'index.html',
  './static/media/no_image_available.57da1720.jpg',
  './static/media/icon.4243060d.jpeg',
  './static/media/slider1.6f425134.jpg',
  './static/media/slider2.f87093c0.jpg',
  './static/media/slider3.0dcc39de.jpg',
  './static/media/toggle.44f28ff5.png',

  './static/js/2.405b4e47.chunk.js',
  './static/js/main.59905b3f.chunk.js',
  './static/js/runtime-main.81435ab8.js',
  './static/css/2.11829350.chunk.css',
  './static/css/main.4f713c0b.chunk.css',
  

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







self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      .then(response => {
        
        return caches.open(cacheName).then(cache => {
          if (response.type === "basic"){
          cache.put(event.request.url, response.clone());
        }
          return response;
        });
      }).catch(()=>{
       return caches.match('./').then(response => {
          if (response) {
            console.log('Found ', event.request.url, ' in cache');
            console.log(response);
            return response;
          }
        });

        });

    }).catch(error => {
    
        console.log("error in loading pages")

    })
  );
});



self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  const cacheAllowlist = [cacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});



/*

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      .then(response => {
        
        return caches.open(cacheName).then(cache => {
          if (response.type === "basic"){
          cache.put(event.request.url, response.clone());
        }
          return response;
        });
      });

    }).catch(error => {
    
        console.log("error in loading pages")

    })
  );
});

*/