import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CaptainModule } from './modules/captain/captain.module';
import { TeamModule } from './modules/team/team.module';
import { EventModule } from './modules/event/event.module';
import LogsMiddleware from './middlewares/logsMiddleware';
import { PictureModule } from './modules/picture/picture.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ms-db'),
    CaptainModule,
    TeamModule,
    EventModule,
    PictureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
