import mailgun from 'mailgun-js';
import { EmailProvider } from './email-provider';
import { Email } from '../email-types';

export class MailgunService implements EmailProvider {
  private mg;

  constructor(apiKey: string, domain: string) {
    this.mg = mailgun({ domain, apiKey });
  }

  async sendEmail(email: Email): Promise<void> {
    const data = {
      from: process.env.EMAIL_FROM || 'your-verified-email@example.com',
      to: email.to,
      subject: email.subject,
      text: email.body,
    };

    try {
      await this.mg.messages().send(data);
      console.log(`Email sent successfully using Mailgun to ${email.to}`);
    } catch (error) {
      console.error(`Mailgun error: ${error.message}`);
      throw new Error('MailgunError');
    }
  }
}
