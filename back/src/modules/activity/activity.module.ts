import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './entities/activity.entity';

@Module({
   imports: [
    MongooseModule.forFeature([{ name: Activity.name, schema: ActivitySchema }]),
  ],
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule {}
