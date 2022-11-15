const cacheName = 'radiationPagerApp';

const contentToCache = [
  '/index.html',
  '/style.css',
  '/icon.png',
  '/js/serviceworker.js',
  '/js/view/view.js',
  '/js/view/waveformview.js',
  '/js/view/graph.js',
  '/js/audioinput.js',
  '/js/sensor.js',
  '/js/measurement.js',
  '/js/counter.js',
  '/js/controller.js',
  '/js/app.js'
];

self.addEventListener('install', e => {
	console.log('[Service Worker] Install');
  	e.waitUntil(
		caches.open(cacheName).then(cache => {
			console.log('[Service Worker] Caching all: app shell and content');
			return cache.addAll(contentToCache);
		})
  	);
});

self.addEventListener('fetch', e => {
  e.respondWith(
	caches.match(e.request).then(r => {
		console.log('[Service Worker] Fetching resource: ' + e.request.url);
		return r || fetch(e.request).then(response => {
			return caches.open(cacheName).then(cache => {
					console.log('[Service Worker] Caching new resource: ' + e.request.url);
					cache.put(e.request, response.clone());
					return response;
				});
			});
		})
	);
});
