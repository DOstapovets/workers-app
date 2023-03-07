import type { User } from 'app-types';
import type { SessionService } from './session.service';

import { SessionData } from './session.data';

export default class Session implements SessionData {
  id: string;

  user: User;

  lastEnteredAt: number;

  constructor(
    private sessionService: SessionService,
    id: string,
    sessionData: SessionData,
  ) {
    this.id = id;
    this.user = sessionData.user;
    this.lastEnteredAt = sessionData.lastEnteredAt;
  }

  async touch() {
    this.lastEnteredAt = Date.now();

    return this.save();
  }

  toObject(): SessionData {
    return {
      user: this.user,
      lastEnteredAt: this.lastEnteredAt,
    };
  }

  save() {
    return this.sessionService.set(this.id, this.toObject());
  }

  logout() {
    return this.sessionService.del(this.id);
  }
}
