import Redis, { Redis as RedisClient } from 'ioredis';
import cacheProvider from '@config/cache';

import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheProvider.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  };

  public async recover(key: string): Promise<string | null> {
    const data = await this.client.get(key);

    return data;
  };

  public async invalidate(key: string): Promise<void> {};
}
