const CACHE = 'ai-agi-v1';

const FILES = [
  './',
  'index.html',
  'home.css',
  'home.js',
  'AI/logo.png',
  'topic_1.html',
  'topic_2.html',
  'topic_3.html',
  'topic_4.html',
  'topic_5.html',
  'topic_6.html',
  'topic_7.html',
  'topic_8.html',
  'topic_9.html',
  'topic_10.html',
  'topic_11.html',
  'topic_12.html',
  'topic_13.html',
  'topic_14.html',
  'topic_15.html',
  'topic_16.html'
];

// تثبيت: حفظ كل الملفات (لو ملف ناقص مش بيبوّظ الباقي)
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache =>
        Promise.all(
          FILES.map(url =>
            cache.add(url).catch(err => console.warn('Not cached:', url, err))
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

// تفعيل: مسح أي كاش قديم
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// الطلبات: النت الأول، ولو مفيش نت يرجع للكاش
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request).then(cached => cached || caches.match('index.html'))
      )
  );
});
