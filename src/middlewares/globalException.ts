import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('GlobalExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    } else if (exception instanceof TokenExpiredError) {
      status = HttpStatus.UNAUTHORIZED; // Código de estado 401 Unauthorized
      message = 'Token expired'; // Mensaje personalizado para token expirado
    } else {
      message = 'Internal Server Error';
    }

    this.logger.error(
      `HTTP request error: ${request.method} ${request.url}`,
      exception as string,
    );

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
