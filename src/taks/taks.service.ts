import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Timeout } from '@nestjs/schedule';

import { Team, TeamDocument } from '../teams/schemas/team.schema';
import { Model } from 'mongoose';
import teams from '../common/input/teams.json';

@Injectable()
export class TaksService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<TeamDocument>,
  ) {}

  @Timeout(1000)
  async database() {
    try {
      console.log('task service');
      const teamsDB = await this.teamModel.find();
      console.log(`${teamsDB.length} teams in db`);
      if (teamsDB.length > 0) return;

      console.log('inserting teams data');
      //console.log(teams);
      const newTeams = [];
      teams.forEach((team) => {
        const newTeam = new this.teamModel({
          name: team.name,
        });
        newTeams.push(newTeam);
      });

      await this.teamModel.insertMany(newTeams);

      console.log(`${newTeams.length} teams inserted`);
    } catch (error) {
      console.error(error);
    }
  }
}
