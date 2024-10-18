import sgMail from '@sendgrid/mail';
import { EmailProvider } from './email-provider';
import { Email } from '../all-type-email';

export class SendGridService implements EmailProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    sgMail.setApiKey(this.apiKey);
  }

  async sendEmail(email: Email): Promise<void> {
    const msg = {
      to: email.to,
      from: process.env.EMAIL_FROM || 'your-verified-email@example.com',
      subject: email.subject,
      text: email.body,
    };

    try {
      await sgMail.send(msg);
      console.log(`Email sent successfully using SendGrid to ${email.to}`);
    } catch (error) {
      console.error(`SendGrid error: ${error.message}`);
      throw new Error('SendGridError');
    }
  }
}
