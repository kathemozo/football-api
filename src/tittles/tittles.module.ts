import { Module } from '@nestjs/common';
import { TittlesController } from './tittles.controller';
import { TittlesService } from './tittles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tittle, TittleSchema } from './schemas/tittle.schema';
import {
  Competition,
  CompetitionSchema,
} from '../competitions/schemas/competition.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tittle.name, schema: TittleSchema },
      { name: Competition.name, schema: CompetitionSchema },
    ]),
  ],
  controllers: [TittlesController],
  providers: [TittlesService],
})
export class TittlesModule {}
