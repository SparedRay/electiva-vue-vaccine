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
  console.log('Firebase Push message', payload)
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
