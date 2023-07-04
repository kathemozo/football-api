import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Team, TeamDocument } from './schemas/team.schema';
import { Model } from 'mongoose';
import { metadataDTO } from '../common/dto/metadata.dto';
import { CreateTeamDTO } from './dto/create-team.dto';
import { CommonErrors } from '../common/errors/common.errors';

@Injectable()
export class TeamsService {
  private readonly logger = new Logger(TeamsService.name);
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<TeamDocument>,
  ) {}

  async get(pag = 1, tam = 10) {
    try {
      const query = this.teamModel.find().sort({ createdAt: 'desc' });
      const [teams, total] = await Promise.all([
        query.skip((pag - 1) * tam).limit(tam),
        this.teamModel.countDocuments(query),
      ]);

      const metadata: metadataDTO = {
        total,
        page: pag,
        tam,
      };

      return {
        metadata,
        data: teams,
      };
    } catch (error) {
      this.logger.error('error ' + error, error.stack);
      throw new BadRequestException(CommonErrors.UNKNOW_ERROR);
    }
  }

  async getTeam(teamId: string) {
    try {
      const team = await this.teamModel.findById(teamId);
      return team;
    } catch (error) {
      this.logger.error('error ' + error, error.stack);
      throw new BadRequestException(CommonErrors.UNKNOW_ERROR);
    }
  }

  async createTeam(teamData: CreateTeamDTO) {
    try {
      const newTeam = new this.teamModel({ ...teamData });
      await newTeam.save();
      return newTeam;
    } catch (error) {
      this.logger.error('error ' + error, error.stack);
      throw new BadRequestException(CommonErrors.UNKNOW_ERROR);
    }
  }
}
