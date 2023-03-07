/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-syntax */
import type { Redis } from 'ioredis';

import { v4 as uuid } from 'uuid';
import redisClient from 'app-redis-client';
import loggerFactory from 'app-logger';
import Session from '.';
import { SessionData } from './session.data';

const log = loggerFactory('Session Service');

interface NormalizedRedisClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl?: number): Promise<string | null>;
  expire(key: string, ttl: number): Promise<number | boolean>;
  scanIterator(match: string, count: number): AsyncIterable<string>;
  del(key: string[]): Promise<number>;
  mget(key: string[]): Promise<(string | null)[]>;
}

export class SessionService {
  client: NormalizedRedisClient;

  scanCount = 1000;

  prefix = 'session:';

  constructor(client: Redis) {
    this.client = this.normalizeClient(client);
  }

  private normalizeClient(client: Redis): NormalizedRedisClient {
    return {
      get: (key) => client.get(key),
      set: (key, val, ttl) => {
        if (ttl) {
          return client.set(key, val, 'EX', ttl);
        }
        return client.set(key, val);
      },
      del: (key) => client.del(key),
      expire: (key, ttl) => client.expire(key, ttl),
      mget: (keys) => client.mget(keys),
      scanIterator: (match, count) =>
        (async function* () {
          let [c, xs] = await client.scan('0', 'MATCH', match, 'COUNT', count);
          for (const key of xs) yield key;
          while (c !== '0') {
            // eslint-disable-next-line no-await-in-loop
            [c, xs] = await client.scan(c, 'MATCH', match, 'COUNT', count);
            for (const key of xs) yield key;
          }
        })(),
    };
  }

  private async _getAllKeys() {
    const pattern = `${this.prefix}*`;
    const keys = [];
    for await (const key of this.client.scanIterator(pattern, this.scanCount)) {
      keys.push(key);
    }
    return keys;
  }

  async get(sid: string): Promise<Session | null> {
    log.debug(`Get session ${sid}`);
    const data = await this.client.get(`${this.prefix}${sid}`);

    if (!data) return null;
    return new Session(this, sid, JSON.parse(data || 'null'));
  }

  async getMany(sids: string[]): Promise<Session[]> {
    const keys = sids.map((sid) => `${this.prefix}${sid}`);

    const values = await this.client.mget(keys);

    return values.reduce((res, value, idx) => {
      if (!value) return res;

      const data = JSON.parse(value as string) as SessionData;
      const sid = keys[idx].substring(this.prefix.length);

      res.push(new Session(this, sid, data));

      return res;
    }, [] as Session[]);
  }

  async getAll(): Promise<Session[]> {
    const keys = await this._getAllKeys();

    if (!keys.length) return [];

    const values = await this.client.mget(keys);

    if (!values) return [];

    return values.reduce((res, value, idx) => {
      if (!value) return res;

      const data = JSON.parse(value as string) as SessionData;
      const sid = keys[idx].substring(this.prefix.length);

      res.push(new Session(this, sid, data));

      return res;
    }, [] as Session[]);
  }

  async set(sid: string, data: SessionData) {
    log.debug(`Set session ${sid}`);
    const key = `${this.prefix}${sid}`;

    await this.client.set(key, JSON.stringify(data));

    return sid;
  }

  async del(sid: string) {
    const key = `${this.prefix}${sid}`;

    return this.client.del([key]);
  }

  async clear() {
    const keys = await this._getAllKeys();
    return this.client.del(keys);
  }

  generateSid() {
    return uuid();
  }
}

export const sessionService = new SessionService(redisClient);
