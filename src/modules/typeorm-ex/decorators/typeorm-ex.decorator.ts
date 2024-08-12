import { SetMetadata } from '@nestjs/common';
import { EntityTarget } from 'typeorm';
import { IBaseEntity } from '../../../core/entity';

export const TYPEORM_EX_CUSTOM_REPOSITORY = 'TYPEORM_EX_CUSTOM_REPOSITORY';

export const CustomRepository = <T extends IBaseEntity>(
  entity: EntityTarget<T>,
): ClassDecorator => {
  return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
};
