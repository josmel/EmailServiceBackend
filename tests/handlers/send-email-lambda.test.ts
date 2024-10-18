import * as AWS from 'aws-sdk';
import { handler } from '../../src/handlers/send-email-lambda';
import { mockBody } from '../dummy';

import { Email } from '../../src/all-type-email';

const { to, subject, body } = mockBody;
const requestInfo: Email = { to, subject, body };

jest.mock('aws-sdk', () => {
  const startExecutionMock = jest.fn();
  return {
    StepFunctions: jest.fn(() => ({
      startExecution: startExecutionMock,
    })),
    __esModule: true,
    startExecutionMock,
  };
});

describe('Email Step Function Handler', () => {
  let startExecutionMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.STEP_FUNCTION_ARN =
      'arn:aws:states:us-east-1:123456789012:stateMachine:EmailFailoverStateMachine';

    const stepFunctionsInstance = new AWS.StepFunctions() as unknown;
    startExecutionMock = (
      stepFunctionsInstance as { startExecution: jest.Mock }
    ).startExecution;
  });

  const event = {
    body: JSON.stringify(requestInfo),
  };

  it('should start step function execution successfully', async () => {
    startExecutionMock.mockReturnValue({
      promise: jest.fn().mockResolvedValueOnce({}),
    });

    const response = await handler(event);

    expect(startExecutionMock).toHaveBeenCalledTimes(1);
    expect(startExecutionMock).toHaveBeenCalledWith({
      stateMachineArn: process.env.STEP_FUNCTION_ARN,
      input: JSON.stringify(requestInfo),
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      message: 'Email failover process started',
    });
  });

  it('should return 500 if step function execution fails', async () => {
    startExecutionMock.mockReturnValue({
      promise: jest.fn().mockRejectedValueOnce(new Error('ExecutionFailed')),
    });

    const response = await handler(event);

    expect(startExecutionMock).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({
      message: 'Failed to start failover process',
      error: 'ExecutionFailed',
    });
  });
});
