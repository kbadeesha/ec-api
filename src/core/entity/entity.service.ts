import { BaseRepository } from './entity.repository';
import { EntityManager, FindOneOptions, SaveOptions } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { EntityUtils } from './entity.utils';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { NotFoundException } from '@nestjs/common';
import {
  FindConditions,
  GetAll,
  GetByIds,
  GetMany,
  GetOne,
  IBaseEntity,
  IPaginatedResponse,
  IStatusResponse,
} from './interfaces';
import { Operation } from './entity.enums';
import { EntityErrors } from './entity.error.responses';
import { User } from 'src/modules/auth/entities/user.entity';
import { SocketService } from '../../modules/sockets/services';
import { EH } from './entity.types';

// noinspection JSUnusedGlobalSymbols
export abstract class EntityService<Entity extends Partial<IBaseEntity>> {
  protected constructor(
    protected readonly socketService: SocketService,
    protected readonly repository: BaseRepository<Entity>,
    protected readonly entityName: string,
    protected readonly uniqueFieldName?: string,
  ) {}

  // abstract map(entity: Entity): Entity;

  async save<T extends DeepPartial<Entity>>(
    createDto: T,
    options?: SaveOptions & FindOneOptions<Entity>,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<Entity> {
    try {
      return await this.repository.saveAndGet(
        createDto,
        { ...options },
        manager,
      );
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (err) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async saveMany<T extends DeepPartial<Entity>>(
    createDto: T[],
    options?: SaveOptions,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<Entity[]> {
    try {
      return await this.repository.saveMany(createDto, options, manager);
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async update<T extends QueryDeepPartialEntity<Entity>>(
    id: number,
    updateDto: T,
    options?: FindOneOptions<Entity>,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<Entity> {
    try {
      const { affected } = await this.repository.update(id, updateDto, manager);
      if (affected !== 0) {
        return this.get(id, options, manager);
      }
      return Promise.reject(
        new NotFoundException(EntityErrors.E_404_ID(this.entityName)),
      );
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async updateOne<T extends QueryDeepPartialEntity<Entity>>(
    conditions: FindConditions<Entity>,
    updateDto: T,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<IStatusResponse> {
    try {
      const { affected } = await this.repository.updateOne(
        conditions,
        updateDto,
        manager,
      );
      if (affected !== 0) {
        return EntityUtils.handleSuccess(Operation.UPDATE, this.entityName);
      }
      return Promise.reject(
        new NotFoundException(EntityErrors.E_404_CONDITION(this.entityName)),
      );
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async updateMany<T extends QueryDeepPartialEntity<Entity>>(
    conditions: FindConditions<Entity>,
    updateDto: T,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<IStatusResponse> {
    try {
      const { affected } = await this.repository.updateMany(
        conditions,
        updateDto,
        manager,
      );
      if (affected !== 0) {
        return EntityUtils.handleSuccess(Operation.UPDATE, this.entityName);
      }
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async updateByIds<T extends QueryDeepPartialEntity<Entity>>(
    ids: number[],
    updateDto: T,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<IStatusResponse> {
    try {
      const { affected } = await this.repository.updateByIds(
        ids,
        updateDto,
        manager,
      );
      if (affected !== 0) {
        return EntityUtils.handleSuccess(Operation.UPDATE, this.entityName);
      }
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async get(
    id: number,
    options?: FindOneOptions<Entity>,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<Entity> {
    try {
      const entity = await this.repository.get(id, options, manager);
      if (entity) {
        return entity;
      }
      return Promise.reject(
        new NotFoundException(EntityErrors.E_404_ID(this.entityName)),
      );
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async getOne(
    getOne: GetOne<Entity>,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<Entity> {
    try {
      getOne.where = { ...(getOne.where ?? {}), deletedAt: null };
      const entity = await this.repository.getOne(getOne, manager);
      if (entity) {
        return entity;
      }
      return Promise.reject(
        new NotFoundException(EntityErrors.E_404_CONDITION(this.entityName)),
      );
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async getByIds(
    getByIds: GetByIds<Entity>,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<Entity[]> {
    try {
      return await this.repository.getByIds(getByIds, manager);
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async getMany(
    getMany: GetMany<Entity>,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<IPaginatedResponse<Entity> | Entity[]> {
    try {
      const [data, rowCount] = await this.repository.getMany(
        {
          ...getMany,
          where: { ...(getMany.where ?? {}), deletedAt: null },
        },
        manager,
      );
      return getMany.pagination ? { data, rowCount } : data;
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async getAll(
    getAll: GetAll<Entity>,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<IPaginatedResponse<Entity> | Entity[]> {
    try {
      const [data, rowCount] = await this.repository.getMany(
        { ...getAll, where: { deletedAt: null } },
        manager,
      );
      return getAll.pagination ? { data, rowCount } : data;
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async getWithoutPage(
    getMany?: Omit<GetMany<Entity>, 'pagination'>,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<Entity[]> {
    try {
      if (getMany?.options?.skip) {
        getMany.options.skip = undefined;
      }
      if (getMany?.options?.take) {
        getMany.options.take = undefined;
      }
      const [data] = await this.repository.getMany(getMany, manager);
      return data;
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async delete(
    id: number,
    deletedBy: User,
    wipe?: boolean,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<Entity> {
    try {
      let deletedRecord = await this.get(id, undefined, manager);
      const { affected } = wipe
        ? await this.repository.hardDelete(id, manager)
        : await this.repository.delete(id, manager);
      if (affected !== 0) {
        if (!wipe && deletedBy) {
          try {
            deletedRecord = await this.update(
              id,
              { deletedBy } as any,
              undefined,
              manager,
            );
          } catch (err: any) {}
        }
        return deletedRecord;
      }
      return Promise.reject(
        new NotFoundException(EntityErrors.E_404_ID(this.entityName)),
      );
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async deleteByIds(
    ids: number[],
    deletedBy?: User,
    wipe?: boolean,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<IStatusResponse> {
    try {
      const { affected } = wipe
        ? await this.repository.hardDeleteByIds(ids, manager)
        : await this.repository.deleteByIds(ids, manager);
      if (affected !== 0) {
        if (!wipe && deletedBy) {
          await this.updateByIds(ids, { deletedBy } as any, manager);
        }
        return EntityUtils.handleSuccess(Operation.DELETE, this.entityName);
      }
      return Promise.reject(
        new NotFoundException(EntityErrors.E_404_ID(this.entityName)),
      );
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  async count(
    getMany?: GetMany<Entity>,
    manager?: EntityManager,
    eh?: EH,
  ): Promise<number> {
    try {
      getMany.where = { ...(getMany.where ?? {}), deletedAt: null };
      return await this.repository.count(getMany, manager);
    } catch (e: any) {
      if (eh) {
        const err = eh(e);
        if (e) {
          throw err;
        }
      }
      EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
    }
  }

  transaction<T>(
    operation: (entityManager: EntityManager) => Promise<T>,
  ): Promise<T> {
    return this.repository.transaction(operation);
  }
}
