// noinspection JSUnusedLocalSymbols

import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseFilters } from '@nestjs/common';
import { SocketService } from '../services';
import { Gateway } from '../../../core/enums/gateways.enum';
import { SocketEvent } from '../enums';
import { WSExceptionFilter } from '../filters';
import { LoggerService } from '../../../core/services';
import { WSMessage, WSMessageResponse } from '../interfaces';
import { Errors } from '../../../core/responses';
import { AuthErrors } from '../../auth/responses';
import { EventEmitter2 } from '@nestjs/event-emitter';

@UseFilters(new WSExceptionFilter())
@WebSocketGateway({ namespace: Gateway.SOCKET })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly socketService: SocketService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server): void {
    console.log('Server Initialized'); // eslint-disable-line no-console
  }

  async handleConnection(socket: Socket): Promise<any> {
    if (!(await this.socketService.addUser(socket))) {
      socket.emit(SocketEvent.ERROR, AuthErrors.AUTH_401_NOT_LOGGED_IN);
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket): any {
    this.socketService.removeUser(socket);
  }

  @SubscribeMessage(SocketEvent.MESSAGE)
  async onMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: WSMessage,
  ): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, salt, ...user } =
        await this.socketService.getUserBySocket(socket);
      const [data] = await this.eventEmitter.emitAsync(
        message.event,
        user,
        message.data,
        message.rid,
      );
      socket.emit(SocketEvent.MESSAGE, {
        rid: message.rid,
        event: message.event,
        data,
      } as WSMessageResponse);
    } catch (err: any) {
      LoggerService.error(err);
      throw new WsException({
        rid: message.rid,
        event: message.event,
        response: err.response || Errors.ERROR,
      });
    }
  }
}
