import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//ENUM

export type TeamDocument = HydratedDocument<Team>;

//Schema--------------------------------------------------------
@Schema()
export class Team {
  _id: string;

  @Prop()
  name: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
