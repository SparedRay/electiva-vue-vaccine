import firebase from 'firebase/app'
import 'firebase/messaging'
import 'firebase/analytics'

export let swRegistration: ServiceWorkerRegistration

export const showNotification = async (payload: any): Promise<void> => {
  console.log('Push message', payload)
  const notification = JSON.parse(payload.data.notification)
  const notificationTitle = notification.title
  const notificationOptions = {
    body: notification.body
  }

  return swRegistration.showNotification(
    notificationTitle,
    notificationOptions
  )
}

export const initializeFirebase = (registration: ServiceWorkerRegistration): void => {
  firebase.initializeApp({
    apiKey: 'AIzaSyCihY_CMqJkImKDCRlVtLBen6vbUrrlS4I',
    authDomain: 'etl-chile.firebaseapp.com',
    projectId: 'etl-chile',
    storageBucket: 'etl-chile.appspot.com',
    messagingSenderId: '975701806637',
    appId: '1:975701806637:web:5acfdf40051ae154c432a4'
  })
  firebase.analytics()

  const messaging = firebase.messaging()
  messaging.onMessage(payload => {
    console.log('Message received. ', payload)
    showNotification(payload)
  })

  swRegistration = registration
  console.log('Firebase app registered!')
}

export const askForPermissioToReceiveNotifications = async (): Promise<string> => {
  let token = ''
  try {
    const messaging = firebase.messaging()
    token = await messaging.getToken({
      serviceWorkerRegistration: swRegistration
    })
    console.log('token de usuario:', token)
    localStorage.setItem('push-token', token)
  } catch (error) {
    console.error(error)
  }

  return token
}
