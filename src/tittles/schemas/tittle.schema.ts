import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

//ENUM

export type TittleDocument = HydratedDocument<Tittle>;

//Schema--------------------------------------------------------
@Schema({ timestamps: true })
export class Tittle {
  _id: string;

  @Prop()
  season: string;

  @Prop({ type: Types.ObjectId, ref: 'Competition', index: true })
  competition: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Team', index: true })
  winner: Types.ObjectId;
}

export const TittleSchema = SchemaFactory.createForClass(Tittle);
