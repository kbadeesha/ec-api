import { Injectable } from '@nestjs/common';
import { EntityService } from '../../../core/entity';
import { Verification } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { SocketService } from 'src/modules/sockets/services';
import { VerificationRepository } from '../interfaces/repositories/verification.repository';

@Injectable()
export class VerificationService extends EntityService<Verification> {
  constructor(
    @InjectRepository(VerificationRepository)
    private readonly verificationRepository: VerificationRepository,
    protected readonly socketService: SocketService,
  ) {
    super(socketService, verificationRepository, 'verification');
  }

  async deleteToken(id: number, manager?: EntityManager): Promise<boolean> {
    await this.verificationRepository.hardDelete(id, manager);
    return true;
  }
}
