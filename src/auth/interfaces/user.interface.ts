import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly password: string;
}
