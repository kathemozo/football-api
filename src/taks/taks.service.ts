import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Timeout } from '@nestjs/schedule';

import { Team, TeamDocument } from '../teams/schemas/team.schema';
import { Model } from 'mongoose';
import teams from '../common/input/teams.json';
import competitionsList from '../common/input/competitions.json';
import {
  Competition,
  CompetitionDocument,
} from '../competitions/schemas/competition.schema';
import { Tittle, TittleDocument } from '../tittles/schemas/tittle.schema';

@Injectable()
export class TaksService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<TeamDocument>,
    @InjectModel(Competition.name)
    private readonly competitionModel: Model<CompetitionDocument>,
    @InjectModel(Tittle.name)
    private readonly tittleModel: Model<TittleDocument>,
  ) {}

  @Timeout(1000)
  async database() {
    try {
      console.log('task service');
      const teamsDB = await this.teamModel.find();
      console.log(`${teamsDB.length} teams in db`);
      if (teamsDB.length > 0) return;

      //console.log('inserting teams data');
      //console.log(teams);
      const newTeams = [];

      const competitionDicc = await this.createCompetitions();

      console.log(teams);
      teams.forEach(async (team) => {
        const newTeam = new this.teamModel({
          name: team.name,
          nickname: team.nickName,
          creationYear: team.creationYear,
          stadium: team.stadiumName,
          country: team.country,
          city: team.city,
        });

        await newTeam.save();
        const tittles = team.tittles;

        tittles.forEach(async (winner) => {
          const newWinner = new this.tittleModel({
            winner: newTeam._id,
            competition: competitionDicc[winner.name],
            season: winner.season,
          });
          await newWinner.save();
        });
      });

      console.log(`${newTeams.length} teams inserted`);
    } catch (error) {
      console.error(error);
    }
  }

  async createCompetitions() {
    const competitionDicc = {};
    competitionsList.forEach(async (competition) => {
      const newCompetition = new this.competitionModel({
        name: competition.name,
      });
      await newCompetition.save();
      competitionDicc[competition.name] = newCompetition._id;
    });

    return competitionDicc;
  }
}
