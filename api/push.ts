import { VercelRequest, VercelResponse } from '@vercel/node'
import { handleError, getQueryString } from './_utils/utils'
import { subscribeToTopic, unsubscribeFromTopic } from './_push/firebase'

export default async (request: VercelRequest, response: VercelResponse) => {
  let token = request.headers.authorization || ''
  let topic = getQueryString(request.query.topic)
  let subscribe = getQueryString(request.query.subscribe) || 'false'

  if (!topic || !token) {
    return response.status(204).json({ message: 'Missing token or topic' })
  }

  if (subscribe == 'true') {
    try {
      await subscribeToTopic(topic, token)
    } catch (e) {
      console.log('Error subscribing', e)
      let handle = handleError(e)
      return response.status(handle.status).json(handle.data)
    }
  } else {
    try {
      await unsubscribeFromTopic(topic, token)
    } catch (e) {
      console.log('Error unsubscribing', e)
      let handle = handleError(e)
      return response.status(handle.status).json(handle.data)
    }
  }
  response.status(200).json({ message: 'success', topic })
}