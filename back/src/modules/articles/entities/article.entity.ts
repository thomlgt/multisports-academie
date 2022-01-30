import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document, SchemaTypes } from 'mongoose';
import { Picture } from 'src/modules/picture/entities/picture.entity';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  _id: string;
  @Prop()
  @IsNotEmpty()
  title: string;
  @Prop()
  @IsNotEmpty()
  content: string;
  @Prop({
    type: SchemaTypes.ObjectId, 
    ref: Picture.name
  })
  mainPicture: Picture;
  @Prop({
  type: SchemaTypes.ObjectId, 
  ref: Picture.name
  })
  gallery: Picture[];
  @Prop()
  createdDate: Date;
  @Prop()
  updatedDate: Date;

  constructor(partial: Partial<Article>) {
    Object.assign(this, partial);
  }
}
export const ArticleSchema = SchemaFactory.createForClass(Article);