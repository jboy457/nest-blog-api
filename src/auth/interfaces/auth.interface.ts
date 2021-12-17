import { User } from './user.interface';

export interface Auth {
  readonly token: string;
  readonly user: User;
}
