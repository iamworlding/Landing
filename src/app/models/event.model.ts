import { User } from './user.model';

export class Event {
  auid: string;
  origin: string;
  type: string;
  date: Date;
  user: User;
}
