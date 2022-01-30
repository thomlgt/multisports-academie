import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity, ActivityDocument } from './entities/activity.entity';

@Injectable()
export class ActivityService {

   constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) {}

  async create(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
    //Transformation du DTO createActivity en Activity
    const activity: Activity = plainToInstance(Activity, createActivityDto);
    activity.createdDate = new Date();
    activity.updatedDate = new Date();
    const createdActivity = new this.activityModel(activity);
    return createdActivity.save();
  }

  async findAll(): Promise<Activity[]> {
    return this.activityModel.find();
  }

  async findOne(id: string): Promise<Activity> {
      const activity = this.activityModel.findById(id);
    if (!activity) {
      //TODO:Log error
      throw new NotFoundException(`Aucune activité avec l'id ${id} trouvée`);
    }
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
            //TODO: LOG error, throw error
            console.log(err);
          }
          console.log(updatedActivity);
        },
      )
      .clone();
  }

  async remove(id: string): Promise<Activity> {
  return this.activityModel
    .findByIdAndRemove(id, {}, (err, deletedActivity) => {
      if (err) {
        //TODO: LOG error, throw error
      }
      return deletedActivity;
    })
    .clone();
  }
}
