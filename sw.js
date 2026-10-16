const CACHE_NAME = 'pau-fc-v1';
const FILES_TO_CACHE = [
  './index.html',
  './css/style.css',
  './js/app.js',
  './manifest.json'
];

// À l'installation : on met en cache les fichiers de base de l'appli
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Au chargement d'une ressource : on sert le cache si dispo, sinon le réseau
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

// Nettoyage des anciennes versions du cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
});
