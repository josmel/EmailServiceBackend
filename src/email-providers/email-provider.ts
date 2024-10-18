import { Email } from '../all-type-email';

/* eslint-disable no-unused-vars */
export interface EmailProvider {
  sendEmail(email: Email): Promise<void>;
}
