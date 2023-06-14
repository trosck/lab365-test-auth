import { HttpException } from '@nestjs/common';

export class BadCredentialsException extends HttpException {
  constructor() {
    super(
      {
        error_message: 'Bad id or password',
      },
      401,
    );
  }
}
