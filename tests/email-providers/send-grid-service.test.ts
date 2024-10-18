import sgMail from '@sendgrid/mail';
import { SendGridService } from '../../src/email-providers/send-grid-service';
import { mockBody } from '../dummy';

jest.mock('@sendgrid/mail');

describe('SendGridService', () => {
  const apiKey = 'fake-api-key';
  const sendGridService = new SendGridService(apiKey);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send an email successfully using SendGrid', async () => {
    (sgMail.send as jest.Mock).mockResolvedValueOnce([{ statusCode: 202 }]);

    await sendGridService.sendEmail({
      to: mockBody.to,
      subject: mockBody.subject,
      body: mockBody.body,
    });

    expect(sgMail.send).toHaveBeenCalledTimes(1);
    expect(sgMail.send).toHaveBeenCalledWith({
      to: mockBody.to,
      from: mockBody.from,
      subject: mockBody.subject,
      text: mockBody.body,
    });

    console.log('Email sent successfully');
  });

  it('should throw SendGridError if sending email fails', async () => {
    (sgMail.send as jest.Mock).mockRejectedValueOnce(
      new Error('SendGrid failed')
    );

    await expect(
      sendGridService.sendEmail({
        to: mockBody.to,
        subject: mockBody.subject,
        body: mockBody.body,
      })
    ).rejects.toThrow('SendGridError');

    expect(sgMail.send).toHaveBeenCalledTimes(1);
    expect(sgMail.send).toHaveBeenCalledWith({
      to: mockBody.to,
      from: mockBody.from,
      subject: mockBody.subject,
      text: mockBody.body,
    });
  });
});
