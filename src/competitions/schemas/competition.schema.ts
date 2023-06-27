import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//ENUM

export type CompetitionDocument = HydratedDocument<Competition>;

//Schema--------------------------------------------------------
@Schema()
export class Competition {
  _id: string;

  @Prop()
  name: string;
}

export const CompetitionSchema = SchemaFactory.createForClass(Competition);
