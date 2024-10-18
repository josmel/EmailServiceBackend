import { EmailProviderEnum } from '../email-types';
import { EmailServiceFactory } from '../email-providers/email-service-factory';
import { sendEmailHandler } from './send-email-handler';

const mailgunService = EmailServiceFactory.createEmailService(
  EmailProviderEnum.MAILGUN
);

export const handler = async (event) => {
  return await sendEmailHandler(
    event,
    mailgunService,
    EmailProviderEnum.MAILGUN
  );
};
