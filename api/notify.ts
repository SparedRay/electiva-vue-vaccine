import { VercelRequest, VercelResponse } from '@vercel/node'
import { sendToTopic } from './_push/firebase'
import { handleError, getQueryString, getBody } from './_utils/utils'

export default async (request: VercelRequest, response: VercelResponse) => {
  const topic = getQueryString(request.query.topic)
  const body = getBody(request.body)
  const message = body?.message

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