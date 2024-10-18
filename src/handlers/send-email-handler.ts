import { Email, EmailResponse } from '../email-types';
import { EmailProvider } from '../email-providers/email-provider';

export const sendEmailHandler = async (
  event,
  emailService: EmailProvider,
  providerName: string
): Promise<EmailResponse> => {
  const { to, subject, body }: Email = event;

  try {
    await emailService.sendEmail({ to, subject, body });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Email sent successfully with ${providerName}`,
      }),
    };
  } catch (error) {
    console.error(`Error in ${providerName} Lambda: ${error.message}`);
    throw error;
  }
};
