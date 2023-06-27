import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

//ENUM

export type Document = HydratedDocument<Association>;

//Schema--------------------------------------------------------
@Schema()
export class Association {
  _id: string;

  @Prop()
  name: string;

  @Prop({ type: [Types.ObjectId], ref: 'Competition', index: true })
  competitions: Types.ObjectId[];
}

export const AssociationSchema = SchemaFactory.createForClass(Association);
