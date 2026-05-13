const CACHE_NAME = 'dunamis-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './LOGO.jpg',
  './nequi.jpg',
  './daviplata.jpg',
  './breb.png',
  './icon-192.png',
  './icon-512.png'
];

// Instalar el Service Worker y guardar en caché los archivos base
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para que funcione más rápido o sin conexión
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo del caché si existe, si no, lo pide de internet
        return response || fetch(event.request);
      })
  );
});
