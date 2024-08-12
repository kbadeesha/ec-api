/* eslint-disable lines-between-class-members */
// noinspection JSUnusedGlobalSymbols

import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { LoggerService } from '../../../core/services';
import { SocketEvent } from '../enums';
import { Role } from 'src/modules/auth/enums/role.enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, Subject } from 'rxjs';
import { WSMessage } from '../interfaces';
import { User } from '../../auth/entities';
import { ACCESS_TOKEN_COOKIE_NAME } from '../../auth/services';
import { parse } from 'cookie';
import * as cookieParser from 'cookie-parser';
import configuration from '../../../core/config/configuration';
import { AppEvent } from '../../../core/enums/app-event.enum';
import { SocketUser } from '../interfaces/socket.interfaces';

@Injectable()
export class SocketService {
  private users: SocketUser[] = [];

  messageListener: Subject<WSMessage<unknown>> = new Subject<
    WSMessage<unknown>
  >();

  constructor(private readonly eventEmitter: EventEmitter2) {}

  pushMessage(wsMessage: WSMessage<unknown>): void {
    this.messageListener.next(wsMessage);
  }

  getMessageListener(): Observable<WSMessage<unknown>> {
    return this.messageListener.asObservable();
  }

  async getUserBySocket(socket: Socket): Promise<User> {
    const cookieHeader = socket.handshake.headers.cookie || '';

    const parsedCookies = parse(cookieHeader);
    const signedAuthCookie = parsedCookies[ACCESS_TOKEN_COOKIE_NAME];

    if (signedAuthCookie) {
      const token = cookieParser.signedCookie(
        signedAuthCookie,
        configuration().cookies.secret,
      );
      if (token) {
        return await this.getUserByToken(token);
      }
    }

    const token = socket.handshake.headers.authorization;
    if (token) {
      return await this.getUserByToken(token);
    }

    return null;
  }

  async getUserByToken(bearerToken: string): Promise<User> {
    const [user] = (await this.eventEmitter.emitAsync(
      AppEvent.USER_GET_BY_TOKEN,
      bearerToken,
    )) as [User];
    return user;
  }

  async addUser(socket: Socket): Promise<boolean> {
    try {
      const { id, role } = await this.getUserBySocket(socket);
      if (!id) {
        return false;
      }
      const user = this.users.find((c) => c.id === id);
      if (user) {
        this.users[this.users.indexOf(user)] = { socket, id, role };
      } else {
        this.users.push({ socket, id, role });
      }
      console.log(`User connected: { socketId: ${socket.id}, userId: ${id} }`); // eslint-disable-line no-console
      console.log(`Users: ${this.users.length}`); // eslint-disable-line no-console
      return true;
    } catch (e) {
      LoggerService.error(e);
      return false;
    }
  }

  getUserSocket(id: number): Socket {
    return this.users.find((c) => c.id !== id)?.socket;
  }

  getUserSockets(ids: number[]): Socket[] {
    return this.users.filter((c) => ids.includes(c.id))?.map((c) => c.socket);
  }

  removeUser(socket: Socket): void {
    this.users = this.users.filter((c) => c.socket.id !== socket.id);
    console.log(`User disconnected: ${socket.id}`); // eslint-disable-line no-console
    console.log(`Users: ${this.users.length}`); // eslint-disable-line no-console
  }

  emit<T>(event: SocketEvent | string, data: T): void;
  emit<T>(event: SocketEvent | string, role: Role | string, data: T): void;
  emit<T>(event: SocketEvent | string, dataOrRole: T | Role, data?: T): void {
    try {
      const dt: T = data ?? (dataOrRole as T);
      const role: Role | undefined = data ? (dataOrRole as Role) : undefined;
      const users = role
        ? this.users.filter((c) => c.role === dataOrRole)
        : this.users;
      users.forEach((c) => {
        c.socket.emit(event, dt);
      });
    } catch (e) {
      LoggerService.error(e);
    }
  }

  emitUser<T>(event: SocketEvent | string, userId: number, data: T): void {
    this.users.find((c) => c.id === userId)?.socket.emit(event, data);
  }

  emitUsers<T>(event: SocketEvent | string, userIds: number[], data: T): void {
    this.users
      .filter((c) => userIds.includes(c.id))
      ?.forEach((c) => c.socket.emit(event, data));
  }

  sendMessage<T = any>(event: AppEvent, data: T, self: number): void;
  sendMessage<T = any>(event: AppEvent, data: T, userIds: number[]): void;
  sendMessage<T = any>(
    event: AppEvent,
    data: T,
    selfOrIds?: number | number[],
  ): void {
    this.users
      .filter((u) =>
        Array.isArray(selfOrIds)
          ? selfOrIds.includes(u.id)
          : selfOrIds !== u.id,
      )
      .forEach((c) => {
        c.socket.emit(SocketEvent.MESSAGE, { event, data } as WSMessage<T>);
      });
  }
}
