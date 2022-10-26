const cacheName = "cache12"; // Change value to force update

self.addEventListener("install", event => {
    // Kick out the old service worker
    self.skipWaiting();

    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
				"/",
				"./icon/android-chrome-192x192.png", // Favicon, Android Chrome M39+ with 4.0 screen density
				"./icon/android-chrome-384x384.png", // Favicon, Android Chrome M47+ Splash screen with 3.0 screen density
				"./icon/apple-touch-icon.png", // Favicon, Apple default
				"./icon/apple-touch-icon-60x60.png", // Apple iPhone, Non-retina with iOS7
				"./icon/apple-touch-icon-120x120.png", // Apple iPhone, Retina with iOS7
				"./icon/apple-touch-icon-152x152.png", // Apple iPad, Retina with iOS7
				"./icon/apple-touch-icon-180x180.png", // Apple iPhone 6 Plus with iOS8
				"browserconfig.xml", // IE11 icon configuration file
				"favicon.ico", // Favicon, IE and fallback for other browsers
				"./icon/favicon-16x16.png", // Favicon, default
				"./icon/favicon-32x32.png", // Favicon, Safari on Mac OS
				"index.html", // Main HTML file
				"logo.png", // Logo
				"main.js", // Main Javascript file
				"manifest.json", // Manifest file
				"./icon/mstile-150x150.png", // Favicon, Windows 8 / IE11
				"./icon/safari-pinned-tab.svg", // Favicon, Safari pinned tab
				"share.png", // Social media sharing
				"style.css", // Main CSS file
			]);
        })
    );
});

self.addEventListener("activate", event => {
    // Delete any non-current cache
    event.waitUntil(
        caches.keys().then(keys => {
            Promise.all(
                keys.map(key => {
                    if (![cacheName].includes(key)) {
                        return caches.delete(key);
                    }
                })
            )
        })
    );
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data. 
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open(cacheName).then(cache => {
            return cache.match(event.request).then(response => {
                return response || fetch(event.request).then(networkResponse => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            })
        })
    );
});
