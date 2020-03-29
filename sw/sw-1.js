var currVersion = '29_03_2020__08_41_00'

// Responde a mensagem de atualização de SW
self.addEventListener("message", function(event) {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(currVersion).then(function(cache) {
        return cache.addAll([
          '/',
          '/manifest.json',
          '/public/material-design-lite/material.min.css',
          '/public/material-design-lite/material.min.js',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          '/local/styles.css',
          '/local/user.jpg',
          '/local/app.js',
          '/local/icons/icon-72x72.png',
          '/local/icons/icon-96x96.png',
          '/local/icons/icon-128x128.png',
          '/local/icons/icon-144x144.png',
          '/local/icons/icon-152x152.png',
          '/local/icons/icon-192x192.png',
          '/local/icons/icon-384x384.png',
          '/local/icons/icon-512x512.png'
        ]);
      })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          // response may be used only once
          // we need to save clone to put one copy in cache
          // and serve second one
          let responseClone = response.clone();
          
          caches.open(currVersion).then(function (cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        }).catch(function () {
          return caches.match('/sw-test/gallery/myLittleVader.jpg');
        });
      }
    }));
});

this.addEventListener('activate', function(event) {
  var cacheWhitelist = [currVersion];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});