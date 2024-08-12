import { IQueryError, IStatusResponse } from './interfaces';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoggerService } from '../services';
import { EntityErrors } from './entity.error.responses';
import { TypeORMErrorType, Operation } from './entity.enums';
import { EntityResponses } from './entity.responses';
import { FKConstraint } from '../enums/constraint.enum';

export class EntityUtils {
  public static handleError(
    e: IQueryError,
    entityName: string,
    uniqueFieldName?: string,
  ): void {
    switch (e.code) {
      case TypeORMErrorType.ER_NO_DEFAULT_FOR_FIELD:
        const field = e.sqlMessage.split("'")[1];
        throw new BadRequestException(
          EntityErrors.E_400_NO_DEFAULT(entityName, field),
        );
      case TypeORMErrorType.ER_DUP_ENTRY:
        throw new ConflictException(
          EntityErrors.E_409_EXIST_U(entityName, uniqueFieldName),
        );
      case TypeORMErrorType.ER_NO_REFERENCED_ROW_2:
        const constraint = e.sqlMessage.split(
          /(CONSTRAINT `|` FOREIGN KEY)/,
        )?.[2];
        if (Object.values(FKConstraint).includes(constraint as FKConstraint)) {
          const [, entityName, relationName] = constraint.split('_');
          throw new BadRequestException(
            EntityErrors.E_404_RELATION(entityName, relationName),
          );
        }
        throw new InternalServerErrorException(EntityErrors.E_500);
      default:
        LoggerService.error(e);
        throw new InternalServerErrorException(EntityErrors.E_500);
    }
  }

  public static handleSuccess(
    operation?: Operation,
    entityName?: string,
  ): IStatusResponse {
    switch (operation) {
      case Operation.CREATE:
        return EntityResponses.CREATED(entityName);
      case Operation.UPDATE:
        return EntityResponses.UPDATE(entityName);
      case Operation.SAVE:
        return EntityResponses.SAVE(entityName);
      default:
        return EntityResponses.SUCCESS;
    }
  }
}
