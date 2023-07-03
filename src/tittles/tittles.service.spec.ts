import { Test, TestingModule } from '@nestjs/testing';
import { TittlesService } from './tittles.service';

describe('TittlesService', () => {
  let service: TittlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TittlesService],
    }).compile();

    service = module.get<TittlesService>(TittlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
