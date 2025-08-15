import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Response,
  Catch,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorResponse = exception.getResponse();
      let errorMessage: string;

      if (typeof errorResponse === 'string') {
        errorMessage = errorResponse;
      } else if (typeof errorResponse === 'object' && errorResponse['message']) {
        errorMessage = Array.isArray(errorResponse['message'])
          ? errorResponse['message'].join(', ')
          : errorResponse['message'];
      } else {
        errorMessage = 'An unexpected error occurred';
      }

      response.status(status).json({
        errors: errorMessage,
      });
    } else if (exception instanceof ZodError) {
      response.status(400).json({
        errors: exception.issues.map((issue) => issue.message).join(', '),
      });
    } else {
      response.status(500).json({
        errors: exception.message,
      });
    }
  }
}
