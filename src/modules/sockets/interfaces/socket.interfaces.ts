import { WSError } from './socket.responses';
import { Role } from '../../auth/enums';
import { Socket } from 'socket.io';

export interface WSException {
  error: WSError;
}

export interface SocketUser {
  id: number;
  role: Role;
  socket: Socket;
}
