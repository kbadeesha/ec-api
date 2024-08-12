import { AppEvent } from '../../../core/enums/app-event.enum';

export interface WSMessage<Event = AppEvent, T = any> {
  rid: string;
  event: Event;
  data?: T;
}
