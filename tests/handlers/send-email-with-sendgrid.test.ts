import { handler } from '../../src/handlers/send-email-with-sendgrid';
import { SendGridService } from '../../src/email-providers/send-grid-service';
import { mockBody } from '../dummy';
import { Email } from '../../src/all-type-email';

jest.mock('../../src/email-providers/send-grid-service');

const { to, subject, body } = mockBody;
const event: Email = { to, subject, body };
describe('send-email-with-sendgrid handler', () => {
  let sendMock: jest.SpyInstance;

  beforeEach(() => {
    sendMock = jest.spyOn(SendGridService.prototype, 'sendEmail');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a 200 response if email is sent successfully', async () => {
    sendMock.mockResolvedValueOnce({});
    const result = await handler(event);

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email sent successfully with SendGrid',
      }),
    });

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(event);
  });

  it('should throw an error if email sending fails', async () => {
    sendMock.mockRejectedValueOnce(new Error('SendGridError'));

    await expect(handler(event)).rejects.toThrow('SendGridError');

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(event);
  });
});
