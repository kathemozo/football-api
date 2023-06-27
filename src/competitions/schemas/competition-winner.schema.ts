import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

//ENUM

export type Document = HydratedDocument<CompetitionWinner>;

//Schema--------------------------------------------------------
@Schema({ timestamps: true, collection: 'competition-winner' })
export class CompetitionWinner {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  season: string;

  @Prop({ type: Types.ObjectId, ref: 'Team', index: true })
  winner: Types.ObjectId;
}

export const CompetitionWinnerSchema =
  SchemaFactory.createForClass(CompetitionWinner);
