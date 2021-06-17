import { VercelRequest, VercelResponse } from '@vercel/node'
import { transporter } from './_utils/mailer'

const sendEmail = async ({ name, email, message }): Promise<any> => {
    return new Promise(resolve => {
        const emailOptions = {
            from: 'ETL Chile <etl-chile@vercel.app>',
            to: `${name} - ${email}`,
            subject: 'Notificacion ETL',
            text: `Hola ${name}, ${message}`,
            html: `<h2>Hola ${name}</h2><br><p>${message}</p>`,
        }
        transporter.sendMail(emailOptions, mail => {
            resolve(mail)
        });
    })
}

export default async (req: VercelRequest, res: VercelResponse) => {
    if (req.method === 'POST') {
      const emailRes = await sendEmail(req.body);
      if (emailRes.messageId) {
        return res.status(200).json({ message: `Email sent successfuly` });
      }
  
      return res.status(400).json({ message: 'Error sending email' });
    }
  
    return res.status(400).json({ message: `Incorrect method: ${req.method}. Did you mean POST?` });
  }