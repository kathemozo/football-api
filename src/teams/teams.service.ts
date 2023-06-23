import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Team, TeamDocument } from './schemas/team.schema';
import { Model } from 'mongoose';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger(TeamsService.name);
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<TeamDocument>,
  ) {}

  async get() {
    try {
      return await this.teamModel.find();
    } catch (error) {
      this.logger.error('error ' + error, error.stack);
      throw new BadRequestException('unknow error');
    }
  }
}
