import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { ClubsModule } from './clubs/clubs.module';
import { HealthController } from './health/health.controller';
import { getCacheConfig } from './config/cache.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.RATE_LIMIT_TTL || '60', 10) * 1000,
        limit: parseInt(process.env.RATE_LIMIT_MAX || '30', 10),
      },
    ]),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: getCacheConfig,
    }),
    ClubsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
