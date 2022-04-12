import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PictureService } from './picture.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

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


  @Post('/add')
  @UseInterceptors(
    FileInterceptor('image'),
  )
  async uploadImage(@UploadedFile() image) {
    return this.pictureService.uploadImage(image);
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
