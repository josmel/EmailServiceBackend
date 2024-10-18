import { Email } from '../src/all-type-email';

export const mockBody: Email = {
  from: process.env.EMAIL_FROM || 'your-verified-email@example.com',
  to: 'recipient@example.com',
  subject: 'Test Email',
  body: 'This is a test',
};
