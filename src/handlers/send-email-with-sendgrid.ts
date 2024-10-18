import { EmailServiceFactory } from '../email-providers/email-service-factory';
import { sendEmailHandler } from './send-email-handler';
import { EmailProviderEnum } from '../email-types';

const SendgridService = EmailServiceFactory.createEmailService(
  EmailProviderEnum.SENDGRID
);

export const handler = async (event) => {
  return await sendEmailHandler(
    event,
    SendgridService,
    EmailProviderEnum.SENDGRID
  );
};
