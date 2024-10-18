import { SESService } from '../email-providers/ses-service';
import { Email, EmailResponse } from '../all-type-email';

const sesService = new SESService();

export const handler = async (event): Promise<EmailResponse> => {
  const { to, subject, body }: Email = event;

  try {
    await sesService.sendEmail({ to, subject, body });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully with SES' }),
    };
  } catch (error) {
    console.error(`Error in SES Lambda: ${error.message}`);

    throw error;
  }
};
