import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketEvent } from '../enums';
import { EntityErrorResponse } from '../../../core/entity';
import { applyTemplate, toErrorObject } from '../../../core/converters';
import { LoggerService } from '../../../core/services';
import { WSException } from '../interfaces/socket.interfaces';
import { ClassValidatorErrorResponse } from '../../../core/interfaces/response.interfaces';

@Catch(WsException, HttpException)
export class WSExceptionFilter extends BaseWsExceptionFilter {
  public catch(exception: WsException, host: ArgumentsHost): void {
    const socket = <Socket>host.switchToWs().getClient();
    this.handleError(socket, exception);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  public handleError(
    socket: Socket,
    exception: WsException | WSException,
  ): void {
    let ex = exception as any;
    try {
      const [prefix] = (exception as unknown as WSException).error.event.split(
        '.',
      ) as [string, string];

      let errObj = ex.error.response as EntityErrorResponse;
      if (
        (ex.error.response as ClassValidatorErrorResponse).statusCode &&
        Array.isArray(ex.error.response.message)
      ) {
        errObj = toErrorObject(ex.error.response.message[0]);
      }

      ex = {
        rid: (exception as WSException).error.rid,
        event: (exception as WSException).error.event,
        response: {
          status: errObj.status,
          code: applyTemplate(errObj.code, prefix),
          message: applyTemplate(errObj.message, prefix),
        } as EntityErrorResponse,
      };
    } catch (err: any) {
      LoggerService.error(ex);
      try {
        ex = {
          rid: (exception as WSException).error?.rid,
          event: (exception as WSException).error?.event,
          response: {
            status:
              (ex as any).error?.response?.status ??
              (ex as any).error?.status ??
              (ex as any).status ??
              500,
            code: 'ERROR',
            message:
              (ex as any).error?.response?.message ??
              (ex as any).error?.message ??
              (ex as any).message ??
              'Internal Server Error!',
          },
        };
      } catch (err: any) {}
    }

    socket.emit(SocketEvent.ERROR, ex);
  }
}
