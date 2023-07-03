import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpStatus,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

type Payload = {
  message: string;
  result: any;
};
const excludePaths = [];

export class GlobalInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) =>
        throwError(() => {
          if (err instanceof BadRequestException) {
            const response = err.getResponse();

            if (response instanceof Object) {
              // eslint-disable-next-line prefer-const
              let { message, result } = response as Payload;
              message = message ? message : 'unknow-error';

              return new BadRequestException({
                message,
                data: result,
                statusCode: HttpStatus.BAD_REQUEST,
              });
            }
          }
          return err;
        }),
      ),
      map((data) => {
        const urlRequest = context.switchToHttp().getRequest().route.path;

        if (excludePaths.includes(urlRequest)) {
          return data;
        }

        return {
          statusCode: 200,
          data,
        };
      }),
    );
  }
}
