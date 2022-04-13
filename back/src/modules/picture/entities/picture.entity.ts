import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

export type PictureDocument = Picture & Document;

@Schema()
export class Picture {
  _id: string;
  @Prop()
  @IsNotEmpty()
  baseName: string;
  @Prop()
  @IsNotEmpty()
  stockageName: string;
  @Prop()
  @IsNotEmpty()
  url: string;
  @Prop()
  @IsNotEmpty()
  altText: string;
  @Prop()
  createdDate: Date;
  @Prop()
  updatedDate: Date;

  constructor(partial: Partial<Picture>) {
    Object.assign(this, partial);
  }
}
export const PictureSchema = SchemaFactory.createForClass(Picture);
