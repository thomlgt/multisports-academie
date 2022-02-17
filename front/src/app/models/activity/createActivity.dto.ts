import { Picture } from '../picture/picture.model';

export class Activity {
  name: string;
  description: string;
  rules?: string;
  duration?: number;
  points?: number;
  mainPicture?: Picture;
  gallery?: Picture[];
  createdDate: Date;
  updatedDate: Date;
}