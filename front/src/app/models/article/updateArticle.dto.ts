import { Picture } from '../picture/picture.model';

export class Article {
  title?: string;
  content?: string;
  mainPicture?: Picture;
  gallery?: Picture[];
  updatedDate: Date;
}