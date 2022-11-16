import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ApplicationError } from '../application/errors';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    if (exception instanceof ApplicationError) {
      console.error(exception);
      response.status(exception.status as number).json({
        message: exception.message,
      });
    } else if (exception instanceof Error) {
      console.error(exception);
      response.status(500).json({
        message: exception.message,
      });
    } else {
      response.status(500).json({
        message: 'An unexpected error has occurred.',
      });
    }
  }
}
