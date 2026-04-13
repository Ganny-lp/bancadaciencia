/**
 * Service Worker para Progressive Web App
 * Permite cache offline e melhor performance
 */

const CACHE_NAME = "banca-ciencia-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/images/each.png",
  "/images/banca.png",
  "/images/usp.png",
  "/images/eachusp.png",
  "/images/capes.png",
  "/images/fapesp.png",
];

// Instalação do Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache aberto");
      return cache.addAll(urlsToCache);
    }),
  );
});

// Ativação do Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Removendo cache antigo:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

// Interceptação de requisições
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Cache hit - retorna a resposta do cache
        if (response) {
          return response;
        }

        // Clone da requisição
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Verifica se recebemos uma resposta válida
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone da resposta
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // Fallback para quando estiver offline
        return caches.match("/index.html");
      }),
  );
});
