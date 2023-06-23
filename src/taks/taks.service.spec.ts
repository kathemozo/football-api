import { Test, TestingModule } from '@nestjs/testing';
import { TaksService } from './taks.service';

describe('TaksService', () => {
  let service: TaksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaksService],
    }).compile();

    service = module.get<TaksService>(TaksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
