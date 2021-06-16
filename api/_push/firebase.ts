import axios from 'axios'
import { JWT } from 'google-auth-library'

const authToken = () => new Promise(function (resolve, reject) {
  let jwtClient = new JWT({
    email: process.env.FIREBASE_CLIENT_EMAIL,
    key: process.env.FIREBASE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/firebase.messaging']
  })
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      reject(err);
      return;
    }
    resolve(tokens.access_token);
  });
});

const axiosInstance = async () => axios.create({
  headers: await getHeaders()
})

async function getHeaders() {
  const accessToken = await authToken()
  return {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
}

const sendToTopic = async (topic: String, message: String) => {
  const http = await axiosInstance()
  const projectId = process.env.FIREBASE_PROJECT
  return http.post(`https://fcm.googleapis.com//v1/projects/${projectId}/messages:send`, {
    "message": {
      "topic": topic,
      "notification": {
        "body": message,
        "title": "ETL Chile"
      },
      "android": {
        "notification": {
          "clickAction": "https://etl-chile.vercel.app/"
        }
      },
      "webpush": {
        "notification": {
          "icon": "https://etl-chile.vercel.app/img/icons/android-logo-72x72.png",
          "badge": "https://etl-chile.vercel.app/img/icons/logo-filled-72x72.png"
        },
        "fcmOptions": {
          "link": "https://etl-chile.vercel.app/"
        }
      }
    }
  })
}

const getTokenInfo = (token: String) => {
  const headers = {
    'Authorization': 'key=' + process.env.FIREBASE_KEY
  }
  return axios.get(`https://iid.googleapis.com/iid/info/${token}?details=true`, {
    headers: headers
  })
}

const subscribeToTopic = (topic: String, token: String) => {
  const headers = {
    'Authorization': 'key=' + process.env.FIREBASE_KEY
  }
  return axios.post(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, null, {
    headers: headers
  })
}

const unsubscribeFromTopic = (topic: String, token: String) => {
  const headers = {
    'Authorization': 'key=' + process.env.FIREBASE_KEY
  }
  return axios.delete(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
    headers: headers
  })
}

export { sendToTopic, getTokenInfo, subscribeToTopic, unsubscribeFromTopic }