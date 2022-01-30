import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { Picture, PictureDocument } from './entities/picture.entity';

@Injectable()
export class PictureService {
  
  constructor(
    @InjectModel(Picture.name) private pictureModel: Model<PictureDocument>,
  ) {}

  async create(@Body() createPictureDto: CreatePictureDto): Promise<Picture> {
    //Transformation du DTO createCaptain en Captain
    const picture: Picture = plainToInstance(Picture, createPictureDto);
    picture.createdDate = new Date();
    picture.updatedDate = new Date();
    const createdPicture = new this.pictureModel(picture);
    return createdPicture.save();
  }

  async findAll(): Promise<Picture[]> {
    return this.pictureModel.find();
  }

  async findOne(id: string): Promise<Picture> {
    const picture = this.pictureModel.findById(id);
    if (!picture) {
      //TODO:Log error
      throw new NotFoundException(`Aucune image avec l'id ${id} trouvée`);
    }
    return picture;
  }

  async update(
    id: string,
    modifiedPicture: UpdatePictureDto,
  ): Promise<Picture> {
    modifiedPicture.updatedDate = new Date();
    return this.pictureModel
      .findByIdAndUpdate(
        id,
        modifiedPicture,
        { new: true },
        (err, updatedPicture) => {
          if (err) {
            //TODO: LOG error, throw error
            console.log(err);
          }
          console.log(updatedPicture);
        },
      )
      .clone();
  }

  async remove(id: string): Promise<Picture> {
    return this.pictureModel
      .findByIdAndRemove(id, {}, (err, deletedPicture) => {
        if (err) {
          //TODO: LOG error, throw error
        }
        return deletedPicture;
      })
      .clone();
  }
}
