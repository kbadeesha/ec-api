// import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";
import { Status } from '../../enums';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectId,
} from 'typeorm';
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder';
import { User } from '../../../modules/auth/entities';

export type FindConditions<Entity> =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectId
  | ObjectId[]
  | FindOptionsWhere<Entity>;

export interface IQueryError {
  query: string;
  parameters: string[];
  driverError: {
    code: string;
    errno: number;
    sqlState: string;
    sqlMessage: string;
    sql: string;
  };
  code: string;
  errno: number;
  sqlState: string;
  sqlMessage: string;
  sql: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type ISort<Entity> = { [P in FindOptionsOrder<Entity>]: 'ASC' | 'DESC' };

export interface IPagination {
  skip?: number;
  take?: number;
}

export interface IBaseEntity {
  id: number;
  status: Status | string;
  createdAt: Date;
  createdBy?: User;
  updatedAt?: Date;
  updatedBy?: User;
  deletedAt?: Date;
  deletedBy?: User;
}

export interface Get<Entity> {
  relations?: FindOneOptions<Entity>['relations'];
  options?: FindOneOptions<Entity>;
}

export interface GetOne<Entity> extends Get<Entity> {
  where?: FindOneOptions<Entity>['where'];
  not?: FindOneOptions<Entity>['where'];
  search?: FindOneOptions<Entity>['where'];
}

export interface GetAll<Entity> {
  pagination?: IPagination;
  sort?: ISort<Entity>;
  relations?: FindManyOptions<Entity>['relations'];
  options?: FindManyOptions<Entity>;
}

export interface GetMany<Entity> extends GetAll<Entity> {
  filters?: FindManyOptions<Entity>['where'];
  where?: FindOneOptions<Entity>['where'];
  not?: FindOneOptions<Entity>['where'];
  search?: FindOneOptions<Entity>['where'];
}

export interface GetByIds<Entity> extends GetAll<Entity> {
  ids: number[];
}
