const staticPWA = "PWAssistant-v1"
const assets = [
    "/",
    "/favico.ico"
    "/index.html",
    "/css/bootstrap.min.css",
    "/js/bootstrap.min.js",
    "/js/app.js"
    "/navbar-top-fixed.css"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticPWA).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener('fetch', function(event) {
    // … either respond with the cached object or go ahead and fetch the actual URL
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                // retrieve from cache
                return response;
            }

            // if not found in cache, return default offline content (only if this is a navigation request)
            if (event.request.mode === 'navigate') {
                return caches.match('./index.html');
            }

            // fetch as normal
            return fetch(event.request);
        })
    );
});