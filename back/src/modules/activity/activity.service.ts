import { Body, Injectable, NotFoundException, LoggerService, Inject, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity, ActivityDocument } from './entities/activity.entity';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class ActivityService {

  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {
    (logger as WinstonLogger).setContext(this.constructor.name);
  }

  async create(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
    //Transformation du DTO createActivity en Activity
    const activity: Activity = plainToInstance(Activity, createActivityDto);
    activity.createdDate = new Date();
    activity.updatedDate = new Date();
    const createdActivity = new this.activityModel(activity);
    return createdActivity.save();
  }

  async findAll(): Promise<Activity[]> {
    const activities = await this.activityModel.find();
    this.logger.debug(`findAll : ${activities.length} elements trouvés`);
    return activities;
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.activityModel.findById(id)
      .populate('mainPicture')
      .populate('gallery');
    if (!activity) {
      this.logger.warn(`findOne: l'id ${id} n'a renvoyé aucun résultat`);
      throw new NotFoundException(`Aucune activité avec l'id ${id} trouvée`);
    }
    this.logger.debug(`findOne: l'id ${id} a retourné 1 element`);
    return activity;
  }

  async update(id: string, modifiedActivity: UpdateActivityDto): Promise<Activity> {
    modifiedActivity.updatedDate = new Date();
    return this.activityModel
      .findByIdAndUpdate(
        id,
        modifiedActivity,
        { new: true },
        (err, updatedActivity) => {
          if (err) {
            this.logger.error(
              `update: erreur lors de l'update`,
              [
                { "erreur": err },
                { "méthode": "update" },
                { "id": id },
                { "entry": modifiedActivity }
              ]);
            throw new BadRequestException(`update: l'update de l'activité ${id} a échoué`);
          }
          this.logger.debug(`update: l'element ${id} a été modifié avec succès`);
        },
      )
      .clone();
  }

  async remove(id: string): Promise<Activity> {
    return this.activityModel
      .findByIdAndRemove(id, {}, (err, deletedActivity) => {
        if (err) {
          this.logger.error(`remove: erreur lors de la suppression de l'element ${id}`, err);
          throw new BadRequestException(`erreur lors de la suppression de l'activité ${id}`);
        }
        this.logger.debug(`remove: l'element ${id} a été supprimé avec succès`);
        return deletedActivity;
      })
      .clone();
  }
}
