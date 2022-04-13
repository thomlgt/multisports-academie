import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { editFileName, imageFileFilter, PictureService } from './picture.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('pictures')
@Controller('pictures')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  /**
   * crée une nouvelle image
   * @param createPictureDto 
   * @returns 
   */
  @ApiBody({
      type: CreatePictureDto,
      description: "l'objet image à creer",
  })
  @Post()
  create(@Body() createPictureDto: CreatePictureDto) {
    return this.pictureService.create(createPictureDto);
  }


  /**
   * upload une série d'images (max. 20) sur le disque
   * et insère les entrées correspondantes en base
   * @param images 
   * @returns les objets pictures ainsi créés
   */
  @Post('/upload')
  @UseInterceptors(
    FilesInterceptor(
      'images',
      20,
      {
        //TODO: envoyer vers un serveur distant type CDN
        storage: diskStorage({
          destination: '../front/src/assets/images/uploaded',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
        preservePath: true
      }
    )
  )
  async uploadImages(@UploadedFiles() images) {
    return this.pictureService.uploadImages(images);
  } 

  /**
   * retourne toutes les images en base
   * @returns 
   */
  @Get()
  findAll() {
    return this.pictureService.findAll();
  }

  /**
   * retourne une image à partir de son id
   * @param id 
   * @returns 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pictureService.findOne(id);
  }

  /**
   * modifie une image
   * @param id 
   * @param updatePictureDto 
   * @returns 
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePictureDto: UpdatePictureDto) {
    return this.pictureService.update(id, updatePictureDto);
  }

  /**
   * supprime une image à partir de son id
   * @param id 
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pictureService.remove(id);
  }
}
