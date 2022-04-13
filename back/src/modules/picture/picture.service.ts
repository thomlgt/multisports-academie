import { BadRequestException, Body, Inject, Injectable, LoggerService, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { extname } from 'path';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { Picture, PictureDocument } from './entities/picture.entity';

@Injectable()
export class PictureService {

  constructor(
    @InjectModel(Picture.name) private pictureModel: Model<PictureDocument>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {
    (logger as WinstonLogger).setContext(this.constructor.name);
 }

  uploadImages(images: any[]) {
    const response = [];
    images.forEach(file => {
      console.log(file);
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  async create(@Body() createPictureDto: CreatePictureDto): Promise<Picture> {
    //Transformation du DTO createPictureDto en Picture
    const picture: Picture = plainToInstance(Picture, createPictureDto);
    picture.createdDate = new Date();
    picture.updatedDate = new Date();
    const createdPicture = new this.pictureModel(picture);
    return createdPicture.save();
  }

  async findAll(): Promise<Picture[]> {
    const pictures = await this.pictureModel.find();
    this.logger.debug(`findAll : ${pictures.length} elements trouvés`);
    return pictures;
  }

  async findOne(id: string): Promise<Picture> {
    const picture = this.pictureModel.findById(id);
    if (!picture) {
      this.logger.warn(`findOne: l'id ${id} n'a renvoyé aucun résultat`);
      throw new NotFoundException(`Aucune image avec l'id ${id} trouvée`);
    }
    return picture;
  }

  async update(id: string, modifiedPicture: UpdatePictureDto): Promise<Picture> {
    modifiedPicture.updatedDate = new Date();
    return this.pictureModel
      .findByIdAndUpdate(
        id,
        modifiedPicture,
        { new: true },
        (err, updatedPicture) => {
          if (err) {
            this.logger.error(
              `update: erreur lors de l'update`,
              [
                { "erreur": err },
                { "méthode": "update" },
                { "id": id },
                { "entry": modifiedPicture }
              ]);
            throw new BadRequestException(`update: l'update de l'element ${id} a échoué`);
          }
          this.logger.debug(`update: l'element ${id} a été modifié avec succès`);
        },
      )
      .clone();
  }

  async remove(id: string): Promise<Picture> {
    return this.pictureModel
      .findByIdAndRemove(id, {}, (err, deletedPicture) => {
        if (err) {
          this.logger.error(`remove: erreur lors de la suppression de l'element ${id}`, err);
          throw new BadRequestException(`erreur lors de la suppression de la photo ${id}`);
        }
        this.logger.debug(`remove: l'element ${id} a été supprimé avec succès`);
        return deletedPicture;
      })
      .clone();
  } 
}

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Seules les images de type JPG, PNG et GIF sont acceptées'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0].replace(/\ /g, "_");
  const fileExtName = extname(file.originalname);
  callback(null, `${name}-${Date.now()}${fileExtName}`);
};
