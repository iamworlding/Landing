import { UserEvent } from './userevent.model';

export class Event {
  auid: string;
  origin: string;
  type: string;
  date: string;
  date_int: number;
  user: UserEvent;
}
