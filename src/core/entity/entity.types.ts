import { IQueryError } from './interfaces';

export type EH = (err: IQueryError) => Error | void;
