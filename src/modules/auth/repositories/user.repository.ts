import { CustomRepository } from '../../typeorm-ex/decorators';
import { BaseRepository, relations } from 'src/core/entity';

import { IUserRepository } from '../interfaces';
import { User } from '../entities/user.entity';

// noinspection JSUnusedGlobalSymbols
export const userRelations = [...relations];

@CustomRepository(User)
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository {}
