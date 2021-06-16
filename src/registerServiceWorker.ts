/* eslint-disable no-console */

import { register } from 'register-service-worker'
import { initializeFirebase } from './pushNotifications'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
      document.dispatchEvent(new CustomEvent('sw:ready'))
    },
    registered (e) {
      console.log('Service worker has been registered.')
      initializeFirebase(e)
      document.dispatchEvent(new CustomEvent('sw:registered', { detail: e }))
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (e) {
      console.log('New content is available; please refresh.')
      document.dispatchEvent(new CustomEvent('sw:updated', { detail: e }))
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
