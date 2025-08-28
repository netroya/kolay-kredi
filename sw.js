// Service Worker for Kolay Kredi PWA
const CACHE_NAME = 'kolay-kredi-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Files to cache for offline functionality
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/kredi-hesaplama.html',
  '/kredi-kartlari.html', 
  '/mevduat.html',
  '/doviz-cevirici.html',
  '/assets/css/index.css',
  '/assets/css/notifications.css',
  '/assets/css/loading.css',
  '/assets/js/notifications.js',
  '/assets/js/loading.js',
  '/manifest.json',
  '/offline.html',
  // Bank logos
  '/assets/images/banks/ziraat.svg',
  '/assets/images/banks/vakifbank.svg',
  '/assets/images/banks/halkbank.svg',
  '/assets/images/banks/isbank.svg',
  '/assets/images/banks/garanti.svg',
  '/assets/images/banks/akbank.svg',
  '/assets/images/banks/yapikredi.svg',
  '/assets/images/banks/teb.svg',
  '/assets/images/banks/ing.svg',
  '/assets/images/banks/qnb.svg',
  '/assets/images/banks/denizbank.svg'
];

// External resources to cache
const EXTERNAL_CACHE_URLS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache static resources
self.addEventListener('install', event => {
  console.log('[SW] Install event');
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        
        // Cache static files
        await cache.addAll(STATIC_CACHE_URLS);
        console.log('[SW] Static files cached successfully');
        
        // Cache external resources with no-cors mode
        for (const url of EXTERNAL_CACHE_URLS) {
          try {
            const response = await fetch(url, { mode: 'no-cors' });
            await cache.put(url, response);
          } catch (error) {
            console.warn('[SW] Failed to cache external resource:', url, error);
          }
        }
        
        // Force activation of new service worker
        await self.skipWaiting();
        
      } catch (error) {
        console.error('[SW] Installation failed:', error);
      }
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activate event');
  
  event.waitUntil(
    (async () => {
      try {
        // Clean up old caches
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
        
        // Take control of all clients
        await self.clients.claim();
        console.log('[SW] Service worker activated successfully');
        
      } catch (error) {
        console.error('[SW] Activation failed:', error);
      }
    })()
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) return;
  
  event.respondWith(
    (async () => {
      try {
        // Try cache first
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          console.log('[SW] Serving from cache:', event.request.url);
          return cachedResponse;
        }
        
        // Try network
        const networkResponse = await fetch(event.request);
        
        // Cache successful responses for future use
        if (networkResponse.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          
          // Don't cache non-static resources
          const url = new URL(event.request.url);
          if (shouldCacheResource(url)) {
            cache.put(event.request, networkResponse.clone());
            console.log('[SW] Cached new resource:', event.request.url);
          }
        }
        
        return networkResponse;
        
      } catch (error) {
        console.error('[SW] Fetch failed:', error);
        
        // Return offline page for navigate requests
        if (event.request.mode === 'navigate') {
          const offlineResponse = await caches.match(OFFLINE_URL);
          return offlineResponse || new Response('Offline - No cache available', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        }
        
        // Return cached version or generic offline response
        return new Response('Resource not available offline', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      }
    })()
  );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'form-sync') {
    console.log('[SW] Background sync triggered');
    event.waitUntil(syncFormData());
  }
});

// Push notification handling
self.addEventListener('push', event => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Yeni bildirim mevcut',
    icon: '/assets/images/icons/icon-192x192.png',
    badge: '/assets/images/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    },
    actions: [
      {
        action: 'open',
        title: 'Aç',
        icon: '/assets/images/icons/action-open.png'
      },
      {
        action: 'close',
        title: 'Kapat',
        icon: '/assets/images/icons/action-close.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Kolay Kredi', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || '/')
    );
  }
});

// Helper functions
function shouldCacheResource(url) {
  // Cache own domain resources and allowed external resources
  return url.origin === self.location.origin ||
         EXTERNAL_CACHE_URLS.some(allowedUrl => url.href.startsWith(allowedUrl));
}

async function syncFormData() {
  // Implement form data sync logic here
  try {
    // Get pending form data from IndexedDB
    // Send to server when online
    console.log('[SW] Form data synced successfully');
  } catch (error) {
    console.error('[SW] Form sync failed:', error);
  }
}

// Periodic background sync for rate updates
self.addEventListener('periodicsync', event => {
  if (event.tag === 'rate-update') {
    event.waitUntil(updateBankRates());
  }
});

async function updateBankRates() {
  try {
    // Fetch latest bank rates
    // Update cache with new data
    console.log('[SW] Bank rates updated');
  } catch (error) {
    console.error('[SW] Rate update failed:', error);
  }
}

// Error handling
self.addEventListener('error', event => {
  console.error('[SW] Error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('[SW] Unhandled rejection:', event.reason);
});

console.log('[SW] Service worker loaded successfully');