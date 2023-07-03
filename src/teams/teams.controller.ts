import { Controller, Get, Param, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  @Get()
  async get(@Query('page') page = 1, @Query('tam') tam = 10) {
    return await this.teamsService.get(page, tam);
  }

  @Get(':id')
  async getTeam(@Param('id') teamId: string) {
    return await this.teamsService.getTeam(teamId);
  }
}
