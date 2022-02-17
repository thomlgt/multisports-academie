import { Picture } from '../picture/picture.model';

export class Activity {
  _id: string;
  name: string;
  description: string;
  rules: string;
  duration: number;
  points: number;
  mainPicture: Picture;
  gallery: Picture[];
  createdDate: Date;
  updatedDate: Date;
}

  