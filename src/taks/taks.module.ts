import { Module } from '@nestjs/common';
import { TaksService } from './taks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from '../teams/schemas/team.schema';
import { ScheduleModule } from '@nestjs/schedule';
import {
  Competition,
  CompetitionSchema,
} from '../competitions/schemas/competition.schema';
import { Tittle, TittleSchema } from '../tittles/schemas/tittle.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Team.name, schema: TeamSchema },
      { name: Competition.name, schema: CompetitionSchema },
      { name: Tittle.name, schema: TittleSchema },
    ]),
  ],
  providers: [TaksService],
})
export class TaksModule {}
