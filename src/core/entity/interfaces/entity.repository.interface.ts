import { DeepPartial } from 'typeorm/common/DeepPartial';
import {
  DeleteResult,
  EntityManager,
  FindOneOptions,
  SaveOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { FindConditions, GetByIds, GetMany, GetOne } from './entity.interfaces';

export interface IEntityRepository<Entity> {
  save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
    manager?: EntityManager,
  ): Promise<T & Entity>;

  saveAndGet<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions & FindOneOptions<Entity>,
    manager?: EntityManager,
  ): Promise<Entity>;

  saveMany<T extends DeepPartial<Entity>>(
    entities: T[],
    options?: SaveOptions,
    manager?: EntityManager,
  ): Promise<(T & Entity)[]>;

  update(
    id: number,
    partialEntity: QueryDeepPartialEntity<Entity>,
    manager?: EntityManager,
  ): Promise<UpdateResult>;

  updateAndGet(
    id: number,
    partialEntity: QueryDeepPartialEntity<Entity>,
    options?: FindOneOptions<Entity>,
    manager?: EntityManager,
  ): Promise<Entity>;

  updateOne(
    conditions: FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
    manager?: EntityManager,
  ): Promise<UpdateResult>;

  updateMany(
    findConditions: FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
    manager?: EntityManager,
  ): Promise<UpdateResult>;

  updateByIds(
    ids: number[],
    partialEntity: QueryDeepPartialEntity<Entity>,
    manager?: EntityManager,
  ): Promise<UpdateResult>;

  get(
    id: number,
    options: FindOneOptions,
    manager?: EntityManager,
  ): Promise<Entity | undefined>;

  getOne(
    getOne: GetOne<Entity>,
    manager?: EntityManager,
  ): Promise<Entity | undefined>;

  getByIds(
    getByIds: GetByIds<Entity>,
    manager?: EntityManager,
  ): Promise<Entity[]>;

  getMany(
    getMany: GetMany<Entity>,
    manager?: EntityManager,
  ): Promise<[Entity[], number]>;

  delete(id: number, manager?: EntityManager): Promise<DeleteResult>;

  deleteByIds(ids: number[], manager?: EntityManager): Promise<DeleteResult>;

  hardDelete(id: number, manager?: EntityManager): Promise<DeleteResult>;

  hardDeleteByIds(
    ids: number[],
    manager?: EntityManager,
  ): Promise<DeleteResult>;

  transaction<T>(
    operation: (entityManager: EntityManager) => Promise<T>,
  ): Promise<T>;
}
