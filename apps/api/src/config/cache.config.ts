import { CacheModuleOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

export const getCacheConfig = async (): Promise<CacheModuleOptions> => {
  const redisUrl = process.env.REDIS_URL;

  if (redisUrl) {
    try {
      const store = await redisStore({
        url: redisUrl,
        ttl: 300000, // 5 min default
      });
      console.log('✓ Redis cache enabled');
      return { store } as any;
    } catch (error) {
      console.warn('⚠ Redis connection failed, falling back to in-memory cache');
    }
  }

  console.log('✓ In-memory cache enabled');
  return {
    ttl: 300000, // 5 min
    max: 100,
  };
};
