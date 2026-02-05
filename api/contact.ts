import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Champs obligatoires manquants' });
    }

    const transporter = nodemailer.createTransport({
      host: 'mail.chelylev.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || 'contact@chelylev.com',
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false 
      }
    });

    await transporter.sendMail({
      from: `"Contact Site" <${process.env.EMAIL_USER || 'contact@chelylev.com'}>`,
      to: "contact@chelylev.com",
      replyTo: email,
      subject: `Nouveau message de ${name} (chelylev.com)`,
      text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #ea580c;">Nouvelle demande de contact</h2>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
            <strong>Message :</strong><br />
            ${(message || 'Aucun message').replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error: any) {
    console.error('Erreur SMTP:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
}
