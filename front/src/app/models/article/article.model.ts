import { Picture } from '../picture/picture.model';

export class Article {
  _id: string;
  title: string;
  content: string;
  mainPicture: Picture;
  gallery: Picture[];
  createdDate: Date;
  updatedDate: Date;
}