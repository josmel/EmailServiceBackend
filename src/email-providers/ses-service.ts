import * as AWS from 'aws-sdk';
import { EmailProvider } from './email-provider';
import { Email } from '../email-types';

export class SESService implements EmailProvider {
  private ses;

  constructor() {
    this.ses = new AWS.SES();
  }

  async sendEmail(email: Email): Promise<void> {
    const params = {
      Destination: {
        ToAddresses: [email.to],
      },
      Message: {
        Body: {
          Text: { Data: email.body },
        },
        Subject: { Data: email.subject },
      },
      Source: process.env.EMAIL_FROM || 'your-verified-email@example.com',
    };

    try {
      await this.ses.sendEmail(params).promise();
      console.log(`Email sent successfully using SES to ${email.to}`);
    } catch (error) {
      console.error(`SES error: ${error.message}`);
      throw new Error('SESError');
    }
  }
}
