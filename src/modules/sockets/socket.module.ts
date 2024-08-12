import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SocketService } from './services';
import { SocketGateway } from './gateways';

@Global()
@Module({
  imports: [HttpModule],
  providers: [SocketGateway, SocketService],
  exports: [SocketService],
})
export class SocketModule {}
