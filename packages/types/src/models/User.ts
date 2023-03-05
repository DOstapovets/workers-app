import type { Upload } from './Upload';

export interface User {
  readonly _id: string;
  username: string;
  password?: string;
  fullName?: string;
  avatar?: Upload | string;
  email?: string;
  cover?: Upload | string;
}
