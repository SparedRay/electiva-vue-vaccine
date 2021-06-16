import { VercelRequest, VercelResponse } from '@vercel/node'

import { sendToTopic } from './_push/firebase'
import { handleError, getQueryString } from './_utils/utils'

export default async (request: VercelRequest, response: VercelResponse) => {
  let topic = getQueryString(request.query.topic)
  let message = getQueryString(request.query.message)

  let res = null
  try {
    res = await sendToTopic(topic, message)
  } catch (e) {
    console.log('Error while sending', e)
    let handle = handleError(e)
    return response.status(handle.status).json(handle.data)
  }

  console.log('Topic: ', topic)
  console.log('Message: ', message)
  return response.status(res.status).json({ data: res.data })
}