export interface Email {
  from?: string;
  to: string;
  subject: string;
  body: string;
}
export interface EmailResponse {
  statusCode: number;
  body: string;
}

export interface ErrorResponse extends EmailResponse {
  error: string;
}
