import {
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ClubsService } from './clubs.service';

@ApiTags('clubs')
@Controller('clubs')
@UseInterceptors(CacheInterceptor)
@Throttle({ default: { limit: 30, ttl: 60000 } })
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get('search')
  @CacheTTL(600000) // 10 min
  @ApiOperation({ summary: 'Search clubs by name and platform' })
  @ApiQuery({ name: 'platform', enum: ['common-gen5', 'common-gen4', 'nx'] })
  @ApiQuery({ name: 'name', type: String })
  async searchClubs(
    @Query('platform') platform: string,
    @Query('name') name: string,
  ) {
    return this.clubsService.searchClubs(platform, name);
  }

  @Get(':clubId/info')
  @CacheTTL(300000) // 5 min
  @ApiOperation({ summary: 'Get club info' })
  @ApiParam({ name: 'clubId', type: String })
  @ApiQuery({ name: 'platform', enum: ['common-gen5', 'common-gen4', 'nx'] })
  async getClubInfo(
    @Param('clubId') clubId: string,
    @Query('platform') platform: string,
  ) {
    return this.clubsService.getClubInfo(platform, clubId);
  }

  @Get(':clubId/overall')
  @CacheTTL(300000) // 5 min
  @ApiOperation({ summary: 'Get club overall stats' })
  @ApiParam({ name: 'clubId', type: String })
  @ApiQuery({ name: 'platform', enum: ['common-gen5', 'common-gen4', 'nx'] })
  async getClubOverall(
    @Param('clubId') clubId: string,
    @Query('platform') platform: string,
  ) {
    return this.clubsService.getClubOverall(platform, clubId);
  }

  @Get(':clubId/members')
  @CacheTTL(180000) // 3 min
  @ApiOperation({ summary: 'Get club members stats' })
  @ApiParam({ name: 'clubId', type: String })
  @ApiQuery({ name: 'platform', enum: ['common-gen5', 'common-gen4', 'nx'] })
  async getClubMembers(
    @Param('clubId') clubId: string,
    @Query('platform') platform: string,
  ) {
    return this.clubsService.getClubMembers(platform, clubId);
  }

  @Get(':clubId/matches')
  @CacheTTL(60000) // 1 min
  @ApiOperation({ summary: 'Get club matches' })
  @ApiParam({ name: 'clubId', type: String })
  @ApiQuery({ name: 'platform', enum: ['common-gen5', 'common-gen4', 'nx'] })
  @ApiQuery({
    name: 'type',
    enum: ['league', 'playoff', 'friendly'],
    required: false,
  })
  async getClubMatches(
    @Param('clubId') clubId: string,
    @Query('platform') platform: string,
    @Query('type') type?: string,
  ) {
    return this.clubsService.getClubMatches(platform, clubId, type);
  }
}
