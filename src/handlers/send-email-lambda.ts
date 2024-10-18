import { StepFunctions } from 'aws-sdk';
import { Email, EmailResponse, ErrorResponse } from '../email-types';

const stepFunctionsClient = new StepFunctions();
export const handler = async (
  event
): Promise<EmailResponse | ErrorResponse> => {
  const { to, subject, body }: Email = JSON.parse(event.body);

  const params = {
    stateMachineArn: process.env.STEP_FUNCTION_ARN,
    input: JSON.stringify({ to, subject, body }),
  };

  try {
    await stepFunctionsClient.startExecution(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email failover process started' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to start failover process',
        error: error.message,
      }),
    };
  }
};
