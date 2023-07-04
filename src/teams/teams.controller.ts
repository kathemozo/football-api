import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTeamDTO } from './dto/create-team.dto';
@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  @Get()
  async get(@Query('page') page: number, @Query('tam') tam: number) {
    return await this.teamsService.get(page, tam);
  }

  @Get(':id')
  async getTeam(@Param('id') teamId: string) {
    return await this.teamsService.getTeam(teamId);
  }

  @Post()
  async createTeam(@Body() team: CreateTeamDTO) {
    return await this.teamsService.createTeam(team);
  }
}
