// noinspection JSUnusedGlobalSymbols

import {
  DeleteResult,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOperator,
  ILike,
  In,
  Not,
  ObjectLiteral,
  QueryRunner,
  Repository,
  SaveOptions,
} from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import {
  FindConditions,
  GetByIds,
  GetMany,
  GetOne,
  IBaseEntity,
} from './interfaces';
import { IEntityRepository } from './interfaces/entity.repository.interface';
import { EntityTarget } from 'typeorm/common/EntityTarget';

export const relations = ['createdBy', 'updatedBy', 'deletedBy'];

export class BaseRepository<Entity extends Partial<IBaseEntity> & ObjectLiteral>
  extends Repository<Entity>
  implements IEntityRepository<Entity>
{
  // eslint-disable-line prettier/prettier

  constructor(
    target: EntityTarget<Entity>,
    manager: EntityManager,
    queryRunner?: QueryRunner,
  ) {
    super(target, manager, queryRunner);
  }

  save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
    manager?: EntityManager,
  ): Promise<T & Entity> {
    if (manager) {
      return manager.getRepository(this.target).save(entity, options);
    }
    return super.save(entity, options);
  }

  async saveAndGet<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions & FindOneOptions<Entity>,
    manager?: EntityManager,
  ): Promise<Entity> {
    const newEntity = await this.save(entity, options, manager);
    return this.get(newEntity.id, options, manager);
  }

  saveMany<T extends DeepPartial<Entity>>(
    entities: T[],
    options?: SaveOptions,
    manager?: EntityManager,
  ): Promise<(T & Entity)[]> {
    if (manager) {
      return manager.getRepository(this.target).save(entities, options);
    }
    return super.save(entities, options);
  }

  update(
    id: number,
    partialEntity: QueryDeepPartialEntity<Entity>,
    manager?: EntityManager,
  ): Promise<UpdateResult> {
    if (manager) {
      return manager.getRepository(this.target).update(id, partialEntity);
    }
    return super.update(id, partialEntity);
  }

  async updateAndGet(
    id: number,
    partialEntity: QueryDeepPartialEntity<Entity>,
    options?: FindOneOptions<Entity>,
    manager?: EntityManager,
  ): Promise<Entity> {
    await this.update(id, partialEntity, manager);
    return this.get(id, options, manager);
  }

  updateOne(
    conditions: FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
    manager?: EntityManager,
  ): Promise<UpdateResult> {
    if (manager) {
      return manager
        .getRepository(this.target)
        .update(conditions, partialEntity);
    }
    return super.update(conditions, partialEntity);
  }

  updateMany(
    findConditions: FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
    manager?: EntityManager,
  ): Promise<UpdateResult> {
    if (manager) {
      return manager
        .getRepository(this.target)
        .update(findConditions, partialEntity);
    }
    return super.update(findConditions, partialEntity);
  }

  updateByIds(
    ids: number[],
    partialEntity: QueryDeepPartialEntity<Entity>,
    manager?: EntityManager,
  ): Promise<UpdateResult> {
    return this.updateMany({ id: In(ids) as any }, partialEntity, manager);
  }

  get(
    id: number,
    options: FindOneOptions<Entity>,
    manager?: EntityManager,
  ): Promise<Entity | undefined> {
    return this.getOne({ ...options, where: { id } } as any, manager);
  }

  getOne(
    getOne: GetOne<Entity>,
    manager?: EntityManager,
  ): Promise<Entity | undefined> {
    const { where, not, search, relations, options } = getOne;
    const opt = options ?? {};
    opt.where = where ?? {};
    if (not) {
      opt.where = this.mapWhere(opt.where, not, Not);
    }
    if (search) {
      opt.where = this.mapWhere(opt.where, search, ILike, '%{}%');
    }
    if (relations) {
      opt.relations = relations;
    }
    if (manager) {
      return manager.getRepository(this.target).findOne(opt);
    }
    return super.findOne(opt);
  }

  async getByIds(
    getByIds: GetByIds<Entity>,
    manager?: EntityManager,
  ): Promise<Entity[]> {
    const { ids, relations, pagination, sort, options } = getByIds;
    const opt = options ?? {};
    if (relations) {
      opt.relations = relations;
    }
    if (pagination) {
      opt.take = pagination.take;
      opt.skip = pagination.skip;
    }
    if (sort) {
      opt.order = sort;
    }
    opt.where = { id: In(ids) as any };
    const [entities] = await this.getMany(opt, manager);
    return entities;
  }

  getMany(
    getMany?: GetMany<Entity>,
    manager?: EntityManager,
  ): Promise<[Entity[], number]> {
    const {
      filters,
      where,
      not,
      search,
      relations,
      pagination,
      sort,
      options,
    } = getMany ?? {};
    const opt = options ?? {};
    opt.where = where ?? {};
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          opt.where[key] = filters[key];
        }
      });
    }
    if (not) {
      opt.where = this.mapWhere(opt.where, not, Not);
    }
    if (search) {
      opt.where = this.mapWhere(opt.where, search, ILike, '%{}%');
    }
    if (relations) {
      opt.relations = relations;
    }
    if (pagination) {
      opt.take = pagination.take;
      opt.skip = pagination.skip;
    }
    if (sort) {
      opt.order = sort;
    }
    if (manager) {
      return manager.getRepository(this.target).findAndCount(opt);
    }
    return super.findAndCount(opt);
  }

  delete(id: number, manager?: EntityManager): Promise<DeleteResult> {
    if (manager) {
      return manager.getRepository(this.target).softDelete(id);
    }
    return super.softDelete(id);
  }

  deleteByIds(ids: number[], manager?: EntityManager): Promise<DeleteResult> {
    if (manager) {
      return manager.getRepository(this.target).softDelete(ids);
    }
    return super.softDelete(ids);
  }

  hardDelete(id: number, manager?: EntityManager): Promise<DeleteResult> {
    if (manager) {
      return manager.getRepository(this.target).delete(id);
    }
    return super.delete(id);
  }

  hardDeleteByIds(
    ids: number[],
    manager?: EntityManager,
  ): Promise<DeleteResult> {
    if (manager) {
      return manager.getRepository(this.target).delete(ids);
    }
    return super.delete(ids);
  }

  count(
    options?: FindManyOptions<Entity>,
    manager?: EntityManager,
  ): Promise<number> {
    if (manager) {
      return manager.getRepository(this.target).count(options);
    }
    return super.count(options);
  }

  transaction<T>(
    operation: (entityManager: EntityManager) => Promise<T>,
  ): Promise<T> {
    return this.manager.transaction(operation);
  }

  mapWhere(
    where: FindManyOptions<Entity>['where'],
    data: object,
    operator: <T>(value: FindOperator<T> | T) => FindOperator<T>,
    wrap?: `${string}{}${string}`,
  ): any {
    const whr = where ?? {};
    if (typeof data === 'object') {
      for (const key in data) {
        if (typeof data[key] === 'object') {
          whr[key] = this.mapWhere(whr[key], data[key], operator, wrap);
        } else {
          whr[key] = wrap
            ? operator(wrap.replace('{}', data[key]))
            : operator(data[key]);
        }
      }
      return whr;
    }
    return wrap ? operator(data) : operator(data);
  }
}
