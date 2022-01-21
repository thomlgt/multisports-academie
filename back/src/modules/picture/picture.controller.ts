import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PictureService } from './picture.service';
import { CreatePictureDto } from './dtos/create-picture.dto';
import { UpdatePictureDto } from './dtos/update-picture.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pictures')
@Controller('pictures')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Post()
  create(@Body() createPictureDto: CreatePictureDto) {
    return this.pictureService.create(createPictureDto);
  }

  @Get()
  findAll() {
    return this.pictureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pictureService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePictureDto: UpdatePictureDto) {
    return this.pictureService.update(id, updatePictureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pictureService.remove(id);
  }
}