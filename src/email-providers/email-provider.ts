import { Email } from '../email-types';

/* eslint-disable no-unused-vars */
export interface EmailProvider {
  sendEmail(email: Email): Promise<void>;
}
