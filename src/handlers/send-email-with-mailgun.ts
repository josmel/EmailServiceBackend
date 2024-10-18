import { MailgunService } from '../email-providers/mailgun-service';
import { Email, EmailResponse } from '../all-type-email';

const mailgunService = new MailgunService(
  process.env.MAILGUN_API_KEY,
  process.env.MAILGUN_DOMAIN
);

export const handler = async (event): Promise<EmailResponse> => {
  const { to, subject, body }: Email = event;

  try {
    await mailgunService.sendEmail({ to, subject, body });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully with Mailgun' }),
    };
  } catch (error) {
    console.error(`Error in Mailgun Lambda: ${error.message}`);

    throw error;
  }
};
