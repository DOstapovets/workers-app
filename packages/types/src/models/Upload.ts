import type { User } from './User';

export interface Upload {
  readonly _id: string;
  filename: string;
  mimetype: string;
  originalUrl: string;
  createdBy: User | string;
  meta?: {
    blurhash?: string;
  };
}
