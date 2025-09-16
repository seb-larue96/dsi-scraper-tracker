import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ApiResponse } from "../dto/api-response.dto";
import { map, Observable, tap } from "rxjs";
import { LoggerService } from "src/logger/logger.service";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    constructor(private readonly logger: LoggerService) {}

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> | Promise<Observable<ApiResponse<T>>> {
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(
            tap(() => {
                const { method, url } = request;
                this.logger.info(
                    `${method} ${url} responded successfully`,
                    'ResponseInterceptor'
                )
            }),
            map((data) => {
                if (data instanceof ApiResponse) return data;

                return new ApiResponse<T>(data);
            }),
        );
    }
}