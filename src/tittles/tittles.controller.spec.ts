import { Test, TestingModule } from '@nestjs/testing';
import { TittlesController } from './tittles.controller';

describe('TittlesController', () => {
  let controller: TittlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TittlesController],
    }).compile();

    controller = module.get<TittlesController>(TittlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
