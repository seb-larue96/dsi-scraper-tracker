import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';
import { LoggerService } from "src/logger/logger.service";

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) {}

    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = 
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException ? exception.getResponse() : 'An unexpected error occurred.';

        await this.logger.error(
            `${request.method} ${request.url} failed with status ${status}`,
            'GlobalExceptionFilter',
            exception.stack,
        );

        response.status(status).json({
            success: false,
            message,
            path: request.url,
            status,
            timestamp: new Date(),
        });
    }
}