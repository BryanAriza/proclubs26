import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { EAClient } from '../clients/ea.client';

@Module({
  imports: [HttpModule],
  controllers: [ClubsController],
  providers: [ClubsService, EAClient],
})
export class ClubsModule {}
