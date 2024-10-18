import * as AWS from 'aws-sdk';
import { SESService } from '../../src/email-providers/ses-service';
import { mockBody } from '../dummy';

jest.mock('aws-sdk', () => {
  const sendEmailMock = jest.fn();
  return {
    SES: jest.fn(() => ({
      sendEmail: sendEmailMock,
    })),
    __esModule: true,
    sendEmailMock,
  };
});

describe('SESService', () => {
  let sesService: SESService;
  let sendEmailMock: jest.Mock;

  beforeEach(() => {
    sendEmailMock = new AWS.SES().sendEmail as jest.Mock;
    sesService = new SESService();
    jest.clearAllMocks();
  });

  it('should send an email successfully using SES', async () => {
    sendEmailMock.mockReturnValue({
      promise: jest
        .fn()
        .mockResolvedValueOnce({ MessageId: 'test-message-id' }),
    });

    await sesService.sendEmail({
      to: mockBody.to,
      subject: mockBody.subject,
      body: mockBody.body,
    });

    expect(sendEmailMock).toHaveBeenCalledTimes(1);
    expect(sendEmailMock).toHaveBeenCalledWith({
      Destination: {
        ToAddresses: [mockBody.to],
      },
      Message: {
        Body: {
          Text: { Data: mockBody.body },
        },
        Subject: { Data: mockBody.subject },
      },
      Source: mockBody.from,
    });
  });

  it('should throw SESError if sending email fails', async () => {
    sendEmailMock.mockReturnValue({
      promise: jest.fn().mockRejectedValueOnce(new Error('SES failed')),
    });

    await expect(
      sesService.sendEmail({
        to: mockBody.to,
        subject: mockBody.subject,
        body: mockBody.body,
      })
    ).rejects.toThrow('SESError');

    expect(sendEmailMock).toHaveBeenCalledTimes(1);
    expect(sendEmailMock).toHaveBeenCalledWith({
      Destination: {
        ToAddresses: [mockBody.to],
      },
      Message: {
        Body: {
          Text: { Data: mockBody.body },
        },
        Subject: { Data: mockBody.subject },
      },
      Source: mockBody.from,
    });
  });
});
