import { VercelRequest, VercelResponse } from '@vercel/node'
import { transporter } from './_utils/mailer'

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

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'POST') {
    const body = req.body
    const emailRes = await sendEmail(body.name, body.email, body.message)
    if (emailRes.messageId) {
      return res.status(200).json({ message: `Email sent successfuly` })
    }

    return res.status(400).json({ message: 'Error sending email' })
  }

  return res.status(400).json({ message: `Incorrect method: ${req.method}. Did you mean POST?` })
}