import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Team, TeamDocument } from './schemas/team.schema';
import { Model } from 'mongoose';
import { metadataDTO } from '../common/dto/metadata.dto';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger(TeamsService.name);
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<TeamDocument>,
  ) {}

  async get(page: number, tam: number) {
    try {
      const query = this.teamModel.find().sort({ createdAt: 'desc' });
      const [teams, total] = await Promise.all([
        query.skip((page - 1) * tam).limit(tam),
        this.teamModel.countDocuments(query),
      ]);

      const metadata: metadataDTO = {
        total,
        page,
        tam,
      };

      return {
        metadata,
        data: teams,
      };
    } catch (error) {
      this.logger.error('error ' + error, error.stack);
      throw new BadRequestException('unknow error');
    }
  }

  async getTeam(teamId: string) {
    try {
      const team = await this.teamModel.findById(teamId);
      return team;
    } catch (error) {
      this.logger.error('error ' + error, error.stack);
      throw new BadRequestException('unknow error');
    }
  }
}
