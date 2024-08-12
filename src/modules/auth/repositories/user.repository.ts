import { BaseRepository, relations } from 'src/core/entity';

import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/repositories';
import { CustomRepository } from 'src/modules/typeorm-ex/decorators';

// noinspection JSUnusedGlobalSymbols
export const userRelations = [...relations];

@CustomRepository(User)
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository {}
