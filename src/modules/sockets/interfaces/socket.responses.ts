import { EntityErrorResponse } from '../../../core/entity';
import { ClassValidatorErrorResponse } from '../../../core/interfaces/response.interfaces';
import { AppEvent } from '../../../core/enums/app-event.enum';

export interface WSMessageResponse<T = any, Event = AppEvent> {
  rid: string;
  event: Event;
  data: T;
}

export interface WSError {
  rid: string;
  event: string;
  response: EntityErrorResponse | ClassValidatorErrorResponse;
}
