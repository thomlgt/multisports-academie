import { PartialType } from '@nestjs/mapped-types';
import { CreatePictureDto } from './create-picture.dto';

export class UpdatePictureDto extends PartialType(CreatePictureDto) {
  url: string;
  altText: string;
  updatedDate: Date;
}
