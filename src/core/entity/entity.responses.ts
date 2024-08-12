import { toSentenceCase } from '../utils';
import { IStatusResponse } from './interfaces';

const EntityResponses = {
  CREATED: (entityName: string): IStatusResponse => {
    return {
      status: true,
      message: `${toSentenceCase(entityName)} created successfully!`,
    };
  },
  UPDATE: (entityName: string): IStatusResponse => {
    return {
      status: true,
      message: `${toSentenceCase(entityName)} updated successfully!`,
    };
  },
  SAVE: (entityName: string): IStatusResponse => {
    return {
      status: true,
      message: `${toSentenceCase(entityName)} saved successfully!`,
    };
  },
  SUCCESS: {
    status: true,
    message: 'success',
  },
};

export { EntityResponses };
