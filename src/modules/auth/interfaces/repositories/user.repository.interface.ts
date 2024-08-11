import { IEntityRepository } from '../../../../core/entity/interfaces/entity.repository.interface';
import { User } from '../../entities';

export interface IUserRepository extends IEntityRepository<User> {}
