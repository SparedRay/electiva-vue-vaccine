import { VercelRequest, VercelResponse } from '@vercel/node'
import { handleError, getQueryString, getBody } from './_utils/utils'
import fetch from 'isomorphic-unfetch'

export default async (request: VercelRequest, response: VercelResponse) => {
  const topic = getQueryString(request.query.topic)
  const body = getBody(request.body)
  const message = body?.message

  let res = null
  try {
    res = await fetch(`https://maker.ifttt.com/trigger/data_updated/with/key/${topic}`, {
        method: 'POST',
        headers: {
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
  return response.status(res.status).json({ data: "Sended" })
}