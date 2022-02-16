import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document, SchemaTypes } from 'mongoose';
import { Picture } from 'src/modules/picture/entities/picture.entity';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  _id: string;
  @Prop()
  @IsNotEmpty()
  name: string;
  @Prop()
  @IsNotEmpty()
  description: string;
  @Prop()
  @IsNotEmpty()
  rules: string;
  @Prop()
  @IsNotEmpty()
  duration: number;
  @Prop()
  @IsNotEmpty()
  points: number;
  @Prop({
    type: SchemaTypes.ObjectId, 
    ref: Picture.name
  })
  mainPicture: Picture;
  @Prop({
  type: [SchemaTypes.ObjectId], 
  ref: Picture.name
  })
  gallery: Picture[];
  @Prop()
  createdDate: Date;
  @Prop()
  updatedDate: Date;

  constructor(partial: Partial<Activity>) {
    Object.assign(this, partial);
  }
}
export const ActivitySchema = SchemaFactory.createForClass(Activity);