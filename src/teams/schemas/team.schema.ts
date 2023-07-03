import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//ENUM

export type TeamDocument = HydratedDocument<Team>;

//Schema--------------------------------------------------------
@Schema({ timestamps: true })
export class Team {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  nickname: string;

  @Prop()
  creationYear: number;

  @Prop()
  stadium: string;

  @Prop()
  country: string;

  @Prop()
  city: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
