import { Controller, Get, Query } from '@nestjs/common';
import { TittlesService } from './tittles.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('tittles')
@Controller('tittles')
export class TittlesController {
  constructor(private readonly tittleService: TittlesService) {}

  @Get()
  async getTittlesByCompetition(@Query('competition') id: string) {
    return await this.tittleService.tittlesByCompetition(id);
  }
}
