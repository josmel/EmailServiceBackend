import { SendGridService } from '../email-providers/send-grid-service';
import { Email, EmailResponse } from '../all-type-email';

const sendGridService = new SendGridService(process.env.SENDGRID_API_KEY);

export const handler = async (event): Promise<EmailResponse> => {
  const { to, subject, body }: Email = event;

  try {
    await sendGridService.sendEmail({ to, subject, body });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email sent successfully with SendGrid',
      }),
    };
  } catch (error) {
    console.error(`Error in SendGrid Lambda: ${error.message}`);

    throw error;
  }
};
