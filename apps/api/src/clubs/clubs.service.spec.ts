import { Test, TestingModule } from '@nestjs/testing';
import { ClubsService } from './clubs.service';
import { EAClient } from '../clients/ea.client';
import { NotFoundException } from '@nestjs/common';

describe('ClubsService', () => {
  let service: ClubsService;
  let eaClient: jest.Mocked<EAClient>;

  beforeEach(async () => {
    const mockEAClient = {
      searchClubs: jest.fn(),
      getClubInfo: jest.fn(),
      getClubStats: jest.fn(),
      getClubMembers: jest.fn(),
      getClubMatches: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClubsService,
        {
          provide: EAClient,
          useValue: mockEAClient,
        },
      ],
    }).compile();

    service = module.get<ClubsService>(ClubsService);
    eaClient = module.get(EAClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchClubs', () => {
    it('should return search results', async () => {
      const mockData = [
        {
          clubId: '123',
          name: 'Test Club',
          clubInfo: { regionId: 1 },
        },
      ];
      eaClient.searchClubs.mockResolvedValue(mockData);

      const result = await service.searchClubs('common-gen5', 'Test');

      expect(result).toHaveLength(1);
      expect(result[0].clubId).toBe('123');
      expect(result[0].name).toBe('Test Club');
    });

    it('should return empty array on non-array response', async () => {
      eaClient.searchClubs.mockResolvedValue({} as any);

      const result = await service.searchClubs('common-gen5', 'Test');

      expect(result).toEqual([]);
    });
  });

  describe('getClubInfo', () => {
    it('should return club info', async () => {
      const mockData = {
        '123': {
          name: 'Test Club',
          clubId: '123',
          regionId: 1,
          teamId: 100,
        },
      };
      eaClient.getClubInfo.mockResolvedValue(mockData);

      const result = await service.getClubInfo('common-gen5', '123');

      expect(result.clubId).toBe('123');
      expect(result.name).toBe('Test Club');
    });

    it('should throw NotFoundException when club not found', async () => {
      eaClient.getClubInfo.mockResolvedValue({});

      await expect(
        service.getClubInfo('common-gen5', '999'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
