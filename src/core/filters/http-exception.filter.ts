import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { applyTemplate, toErrorObject } from '../converters';
import { LoggerService } from '../services';
import { Request } from 'express';
import { Endpoint } from '../enums';
import { EntityErrorResponse } from '../entity/interfaces';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): any {
    LoggerService.error(exception);
    const ex: any = exception;
    const request = host.switchToHttp().getRequest<Request>();
    try {
      const [, , prefix] = request.url.split('/') as [string, string, Endpoint];

      let errObj = ex.response as EntityErrorResponse;
      if (ex.response.statusCode && Array.isArray(ex.response.message)) {
        errObj = toErrorObject(ex.response.message[0]);
      }
      ex.response = {
        status: errObj.status,
        code: applyTemplate(errObj.code, prefix),
        message: applyTemplate(errObj.message, prefix),
      } as EntityErrorResponse;
    } catch (err: any) {
      LoggerService.error(ex);
      try {
        ex.response = {
          status: ex.status,
          code: 'ERROR',
          message: ex.response.message
            ? ex.response.message
            : ex.message
              ? ex.message
              : ex.response,
        };
      } catch (err: any) {}
    }

    super.catch(ex, host);
  }
}
