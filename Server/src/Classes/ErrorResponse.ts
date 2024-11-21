export class ErrorResponse {
  status?: number;
  message: string;
  stack?: string;
  error?: Error;

  constructor(status: number, message: string, stack?: string, error?: Error) {
    this.status = status;
    this.message = message;
    this.stack = stack;
    this.error = error;
  }
}
