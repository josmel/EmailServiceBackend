import { Email } from '../src/email-types';

export const mockBody: Email = {
  from: process.env.EMAIL_FROM || 'your-verified-email@example.com',
  to: 'recipient@example.com',
  subject: 'Test Email',
  body: 'This is a test',
};
