import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'An unexpected error occurred.';
        let error: any = exception;

        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            const res = exception.getResponse();

            if (typeof res === 'string') {
            message = res;
            } else if (typeof res === 'object') {
            message = (res as any).message || message;
            error = (res as any).error || error;
            }
        }

        response.status(statusCode).json({
            success: false,
            message,
            error: error?.message || String(error),
            path: request.url,
            statusCode,
            timestamp: new Date().toISOString(),
        });
    }
}