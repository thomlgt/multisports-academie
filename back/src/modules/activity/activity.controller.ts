import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from '../admin/jwt-admin-auth.guard';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@ApiTags('activities')
@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  /**
  * crée une nouvelle activité
  * @param CreateActivityDto 
  * @returns 
  */
  @ApiBody({
      type: CreateActivityDto,
      description: "l'objet activité à creer",
  })
  @Post()
  @UseGuards(AuthGuard("admin"))
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  /**
   * retourne l'ensemble des activités en base
   * @eturns
   */
  @Get()
  findAll() {
    return this.activityService.findAll();
  }

  /**
   * retourne une activité en fonction de son id
   * @param id 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(id);
  }

  /**
   * modifie une activité
   * @param id 
   * @param updateActivityDto 
   */
  @Patch(':id')
  @UseGuards(AuthGuard("admin"))
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activityService.update(id, updateActivityDto);
  }

  /**
   * supprime une activité à partir de son id
   * @param id 
   */
  @Delete(':id')
  @UseGuards(AuthGuard("admin"))
  remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }
}
