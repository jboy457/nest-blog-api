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
    const data = exception.getResponse();
    const body = {
      status: false,
      message: data['message'],
    };
    this.logger.warn(`[${statusCode}] ${data['message']}`);
    res.status(Array.isArray(data['message']) ? 422 : statusCode).json(body);
  }
}
