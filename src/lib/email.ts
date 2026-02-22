import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendApprovalEmail({
  to,
  name,
  locale = 'uk',
}: {
  to: string
  name: string
  locale?: string
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
  const fromEmail = process.env.ADMIN_EMAIL || 'noreply@plast-duesseldorf.de'

  const messages = {
    uk: {
      subject: 'Ваш акаунт схвалено | Plast Düsseldorf',
      greeting: `Вітаємо, ${name}!`,
      body: `Ваш акаунт на сайті Plast Düsseldorf було схвалено адміністратором.`,
      access: 'Тепер ви можете увійти в систему та отримати доступ до ресурсів для членів.',
      button: 'Увійти',
      footer: 'З найкращими побажаннями,<br/>Команда Plast Düsseldorf',
    },
    de: {
      subject: 'Ihr Konto wurde genehmigt | Plast Düsseldorf',
      greeting: `Hallo ${name}!`,
      body: `Ihr Konto auf der Plast Düsseldorf Website wurde von einem Administrator genehmigt.`,
      access: 'Sie können sich jetzt anmelden und auf die Mitgliederressourcen zugreifen.',
      button: 'Anmelden',
      footer: 'Mit freundlichen Grüßen,<br/>Das Plast Düsseldorf Team',
    },
    en: {
      subject: 'Your account has been approved | Plast Düsseldorf',
      greeting: `Hello ${name}!`,
      body: `Your account on the Plast Düsseldorf website has been approved by an administrator.`,
      access: 'You can now sign in and access member resources.',
      button: 'Sign In',
      footer: 'Best regards,<br/>The Plast Düsseldorf Team',
    },
  }

  const t = messages[locale as keyof typeof messages] || messages.en

  try {
    const { data, error } = await resend.emails.send({
      from: `Plast Düsseldorf <${fromEmail}>`,
      to: [to],
      subject: t.subject,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #f8f9fa; border-radius: 8px; padding: 30px; margin-bottom: 20px;">
    <h1 style="color: #2d5016; margin-top: 0; margin-bottom: 20px; font-size: 24px;">${t.greeting}</h1>
    <p style="margin-bottom: 15px; font-size: 16px;">${t.body}</p>
    <p style="margin-bottom: 25px; font-size: 16px;">${t.access}</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${siteUrl}/${locale}/auth/signin"
         style="background-color: #2d5016; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: 600;">
        ${t.button}
      </a>
    </div>
  </div>
  <div style="color: #6c757d; font-size: 14px; text-align: center;">
    <p>${t.footer}</p>
  </div>
</body>
</html>
      `,
    })

    if (error) {
      console.error('Error sending approval email:', error)
      return { success: false, error }
    }

    console.log('Approval email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Failed to send approval email:', error)
    return { success: false, error }
  }
}
