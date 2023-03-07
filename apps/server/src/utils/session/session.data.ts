import type { User } from 'app-types';

export interface SessionData {
  id?: string;
  user: User;
  lastEnteredAt: number;
}
