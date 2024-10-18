import mailgun from 'mailgun-js';
import { MailgunService } from '../../src/email-providers/mailgun-service';
import { mockBody } from '../dummy';

jest.mock('mailgun-js', () => {
  const mockMessages = {
    send: jest.fn(),
  };
  return jest.fn(() => ({
    messages: () => mockMessages,
  }));
});

describe('MailgunService', () => {
  let mailgunService: MailgunService;
  let sendMock: jest.Mock;

  beforeEach(() => {
    mailgunService = new MailgunService('mock-api-key', 'mock-domain');

    sendMock = mailgun().messages().send as jest.Mock;
  });

  it('should send an email successfully', async () => {
    sendMock.mockResolvedValue({});

    await mailgunService.sendEmail({
      to: mockBody.to,
      subject: mockBody.subject,
      body: mockBody.body,
    });

    expect(sendMock).toHaveBeenCalled();
    expect(sendMock).toHaveBeenCalledWith({
      from: mockBody.from,
      to: mockBody.to,
      subject: mockBody.subject,
      text: mockBody.body,
    });
  });

  it('should throw an error if email sending fails', async () => {
    sendMock.mockRejectedValue(new Error('MailgunError'));

    await expect(
      mailgunService.sendEmail({
        to: mockBody.to,
        subject: mockBody.subject,
        body: mockBody.body,
      })
    ).rejects.toThrow('MailgunError');
  });
});
