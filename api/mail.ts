import { VercelRequest, VercelResponse } from '@vercel/node'
import { transporter } from './_utils/mailer'
import { getBody } from './_utils/utils'

const sendEmail = async (name: string, email: string, message: string): Promise<any> => {
  const emailOptions = {
    from: 'ETL Chile <etl-chile@vercel.app>',
    to: `${name} - ${email}`,
    subject: 'Notificacion ETL',
    text: `Hola ${name}, ${message}`,
    html: `<h2>Hola ${name}</h2><br><p>${message}</p>`,
  }
  return transporter.sendMail(emailOptions);
}

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === 'POST') {
    const body = getBody(request.body)
    const emailRes = await sendEmail(body.name, body.email, body.message)
    if (emailRes.messageId) {
      return response.status(200).json({ message: `Email sent successfuly` })
    }

    return response.status(400).json({ message: 'Error sending email' })
  }

  return response.status(400).json({ message: `Incorrect method: ${request.method}. Did you mean POST?` })
}