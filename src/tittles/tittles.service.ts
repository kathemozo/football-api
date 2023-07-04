import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CommonErrors } from '../common/errors/common.errors';
import { Tittle, TittleDocument } from './schemas/tittle.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Competition,
  CompetitionDocument,
} from '../competitions/schemas/competition.schema';

@Injectable()
export class TittlesService {
  private readonly logger = new Logger(TittlesService.name);
  constructor(
    @InjectModel(Tittle.name)
    private readonly tittleModel: Model<TittleDocument>,
    @InjectModel(Competition.name)
    private readonly competitionModel: Model<CompetitionDocument>,
  ) {}
  async tittlesByCompetition(id: string) {
    const competition = await this.competitionExist(id);
    try {
      const tittles = await this.tittleModel
        .find({
          competition: competition._id,
        })
        .populate({ path: 'winner' });

      const tittlesList = tittles.map((tittle) => {
        return {
          team: tittle.winner['name'],
          season: tittle.season,
          tittle: competition.name,
        };
      });
      const sortList = tittlesList.sort((a, b): any => {
        const yearA = a.season.slice(0, 4);
        const yearB = b.season.slice(0, 4);

        return parseInt(yearA) - parseInt(yearB);
      });
      return sortList;
    } catch (error) {
      this.logger.error('error ' + error, error.stack);
      throw new BadRequestException(CommonErrors.UNKNOW_ERROR);
    }
  }

  //utils
  async competitionExist(id: string) {
    try {
      const competition = await this.competitionModel.findById(id);

      if (competition) return competition;
    } catch (error) {
      this.logger.error('error ' + error, error.stack);
      throw new BadRequestException(CommonErrors.UNKNOW_ERROR);
    }
    throw new BadRequestException(CommonErrors.NOT_FOUND);
  }
}
