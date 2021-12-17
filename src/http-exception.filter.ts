import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const statusCode: number = exception.getStatus();
    const message: string = exception.message || null;

    const body = {
      status: false,
      message,
    };
    this.logger.warn(`[${statusCode}] ${message}`);
    res.status(statusCode).json(body);
  }
}
