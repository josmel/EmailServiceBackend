import { MailgunService } from '../email-providers/mailgun-service';
import { SendGridService } from '../email-providers/send-grid-service';
import { SESService } from '../email-providers/ses-service';
import { EmailProvider } from '../email-providers/email-provider';
import { EmailProviderEnum } from '../email-types';

export class EmailServiceFactory {
  static createEmailService(provider: EmailProviderEnum): EmailProvider {
    switch (provider) {
      case EmailProviderEnum.MAILGUN:
        return new MailgunService(
          process.env.MAILGUN_API_KEY,
          process.env.MAILGUN_DOMAIN
        );
      case EmailProviderEnum.SENDGRID:
        return new SendGridService(process.env.SENDGRID_API_KEY);
      case EmailProviderEnum.SES:
        return new SESService();
      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  }
}
