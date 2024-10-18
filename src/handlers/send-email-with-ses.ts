import { sendEmailHandler } from './send-email-handler';
import { EmailServiceFactory } from '../email-providers/email-service-factory';
import { EmailProviderEnum } from '../email-types';

const SesService = EmailServiceFactory.createEmailService(
  EmailProviderEnum.SES
);

export const handler = async (event) => {
  return await sendEmailHandler(event, SesService, EmailProviderEnum.SES);
};
