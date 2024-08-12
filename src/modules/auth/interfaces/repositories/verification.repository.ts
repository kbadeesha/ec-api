import { BaseRepository } from 'src/core/entity';
import { Verification } from '../../entities';
import { CustomRepository } from 'src/modules/typeorm-ex/decorators';

// noinspection JSUnusedGlobalSymbols
export const userRelations = ['user'];

@CustomRepository(Verification)
export class VerificationRepository
  extends BaseRepository<Verification>
  implements VerificationRepository {}
