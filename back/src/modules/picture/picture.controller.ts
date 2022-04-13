import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PictureService } from './picture.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from '../admin/jwt-admin-auth.guard';

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
  @UseGuards(JwtAdminAuthGuard)
  create(@Body() createPictureDto: CreatePictureDto) {
    return this.pictureService.create(createPictureDto);
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
  @UseGuards(JwtAdminAuthGuard)
  update(@Param('id') id: string, @Body() updatePictureDto: UpdatePictureDto) {
    return this.pictureService.update(id, updatePictureDto);
  }

  /**
   * supprime une image à partir de son id
   * @param id 
   * @returns 
   */
  @Delete(':id')
  @UseGuards(JwtAdminAuthGuard)
  remove(@Param('id') id: string) {
    return this.pictureService.remove(id);
  }
}
