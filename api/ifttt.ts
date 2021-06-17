import { VercelRequest, VercelResponse } from '@vercel/node'
import { handleError, getQueryString } from './_utils/utils'

export default async (request: VercelRequest, response: VercelResponse) => {
  let topic = getQueryString(request.query.topic)
  let message = getQueryString(request.body?.message)

  let res = null
  try {
    res = await fetch(`https://maker.ifttt.com/trigger/data_updated/with/key/${topic}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({value1: message})
    })
  } catch (e) {
    console.log('Error while sending', e)
    let handle = handleError(e)
    return response.status(handle.status).json(handle.data)
  }

  console.log('Topic: ', topic)
  console.log('Message: ', message)
  return response.status(res.status).json({ data: res.data })
}