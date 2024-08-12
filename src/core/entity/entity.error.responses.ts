import {
  toLowerCaseBreak,
  toSentenceCase,
  toSnakeCase,
  toUpperCaseBreak,
} from '../utils';
import { EntityErrorResponse } from './interfaces';

const EntityErrors = {
  E_400_NO_DEFAULT: (
    entityName: string,
    field: string,
  ): EntityErrorResponse => ({
    status: 400,
    code: `${toUpperCaseBreak(entityName)}_400_NO_DEFAULT_${toSnakeCase(field, true)}`,
    message: `No default value for ${toLowerCaseBreak(entityName)} ${toLowerCaseBreak(field)}!`,
  }),
  E_404_ID: (entityName: string): EntityErrorResponse => ({
    status: 404,
    code: `${toUpperCaseBreak(entityName)}_404_ID`,
    message: `Cannot find a ${toLowerCaseBreak(entityName)} with given id!`,
  }),
  E_404_RELATION: (
    entityName: string,
    relationName: string,
  ): EntityErrorResponse => ({
    status: 404,
    code: `${toUpperCaseBreak(entityName)}_404_${relationName.toUpperCase()}_ID`,
    message: `Cannot find a ${relationName.toLowerCase()} with given id!`,
  }),
  E_404_CONDITION: (entityName: string): EntityErrorResponse => ({
    status: 404,
    code: `${toUpperCaseBreak(entityName)}_404_CONDITION`,
    message: `Cannot find a ${toLowerCaseBreak(entityName)} with given condition!`,
  }),
  E_409_EXIST_U: (entityName: string, unique: string): EntityErrorResponse => ({
    status: 409,
    code: `${toUpperCaseBreak(entityName)}_409_EXIST_${toSnakeCase(unique, true)}`,
    message: `${toSentenceCase(entityName)} with given ${unique.toLowerCase()} already exist!`,
  }),
  E_500: {
    status: 500,
    code: 'E_500',
    message: 'Unexpected error occurred!',
  },
};

export { EntityErrors };
