import { handler } from '../../src/handlers/send-email-with-ses';
import { SESService } from '../../src/email-providers/ses-service';
import { mockBody } from '../dummy';
import { Email } from '../../src/email-types';

jest.mock('../../src/email-providers/ses-service');

const { to, subject, body } = mockBody;
const event: Email = { to, subject, body };
describe('send-email-with-ses handler', () => {
  let sendMock: jest.SpyInstance;

  beforeEach(() => {
    sendMock = jest.spyOn(SESService.prototype, 'sendEmail');
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
        message: 'Email sent successfully with SES',
      }),
    });

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(event);
  });

  it('should throw an error if email sending fails', async () => {
    sendMock.mockRejectedValueOnce(new Error('SESError'));

    await expect(handler(event)).rejects.toThrow('SESError');

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(event);
  });
});
