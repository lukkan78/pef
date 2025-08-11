const CACHE = 'pef-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './src/stats.js',
  './src/profile.js',
  './src/prediction/predictor.js',
  './src/prediction/eu_table_predictor.js',
  './src/prediction/eu_table.json',
  './src/prediction/nunn_gregg.js',
  './src/pdf/report.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js',
  'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.es.min.js',
  'https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
