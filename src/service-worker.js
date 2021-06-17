/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.7/firebase-messaging.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.7/firebase-analytics.js')

firebase.initializeApp({
  apiKey: 'AIzaSyCihY_CMqJkImKDCRlVtLBen6vbUrrlS4I',
  authDomain: 'etl-chile.firebaseapp.com',
  projectId: 'etl-chile',
  storageBucket: 'etl-chile.appspot.com',
  messagingSenderId: '975701806637',
  appId: '1:975701806637:web:5acfdf40051ae154c432a4'
})

const messaging = firebase.messaging()

const showNotification = (payload) => {
  console.log('Worker Push message', payload)
  const notification = JSON.parse(payload.data.notification)
  const notificationTitle = notification.title
  const notificationOptions = {
    body: notification.body
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
}

messaging.onMessage(showNotification)
messaging.onBackgroundMessage(showNotification)

if (workbox) {
  // adjust log level for displaying workbox logs
  // workbox.core.LOG_LEVELS.debug ??
  workbox.setConfig({
    debug: true
  })
  workbox.core.clientsClaim()

  // apply precaching. In the built version, the precacheManifest will
  // be imported using importScripts (as is workbox itself) and we can
  // precache this. This is all we need for precaching
  self.__precacheManifest = [].concat(self.__precacheManifest || [])
  workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

  // Make sure to return a specific response for all navigation requests.
  // Since we have a SPA here, this should be index.html always.
  // https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode
  workbox.routing.registerNavigationRoute('/index.html')

  // Setup cache strategy for Google Fonts. They consist of two parts, a static one
  // coming from fonts.gstatic.com (strategy CacheFirst) and a more ferquently updated on
  // from fonts.googleapis.com. Hence, split in two registerroutes
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets'
    })
  )

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30
        })
      ]
    })
  )

  workbox.routing.registerRoute(
    /^https:\/\/cdn\.jsdelivr\.net/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'jsdelivr-cdn'
    })
  )
}

// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (e) => {
  if (!e.data) {
    return
  }

  switch (e.data) {
    case 'skipWaiting':
      self.skipWaiting()
      break
    default:
      // NOOP
      break
  }
})
