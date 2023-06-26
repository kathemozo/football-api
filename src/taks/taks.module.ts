import { Module } from '@nestjs/common';
import { TaksService } from './taks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from '../teams/schemas/team.schema';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
  ],
  providers: [TaksService],
})
export class TaksModule {}
