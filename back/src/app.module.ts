import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CaptainModule } from './modules/captain/captain.module';
import { TeamModule } from './modules/team/team.module';
import { EventModule } from './modules/event/event.module';
import LogsMiddleware from './middlewares/logsMiddleware';
import { PictureModule } from './modules/picture/picture.module';
import { AuthModule } from './modules/auth/auth.module';
import { ActivityModule } from './modules/activity/activity.module';
import { ArticleModule } from './modules/article/article.module';
import { MailModule } from './modules/mail/mail.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const MONGO_HOST = process.env.MONGO_HOST || "localhost"
const MONGO_PORT = process.env.MONGO_PORT || "27017"
const MONGO_USERNAME = process.env.MONGO_USERNAME || "admin"
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "root"
const MONGO_CONNEXION_STRING = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNEXION_STRING, {
      dbName: "ms-db"
    }),
    WinstonModule.forRoot({
      levels: {
        error: 0,
        warn: 1,
        debug: 2,
        info: 3
      },
      format: winston.format.combine(
        winston.format.timestamp({ format: 'DD/MM/YYYY, HH:mm.ss' }),
        winston.format.label({
          label: 'API'
        }),
        winston.format.align(),
        winston.format.json(),
        winston.format.prettyPrint()
      ),
      transports: [
        new winston.transports.Console({ 
          level: 'info',
          format: winston.format.combine(
            winston.format.colorize({all: true}),
            winston.format.cli()
        ) }),
        new winston.transports.File({
          filename: './logs/error.log',
          level: 'warn'
        }),
        new winston.transports.File({
          filename: './logs/combined.log',
          maxsize: 5242880, // 5MB
          maxFiles: 5,
          tailable: true
        }),
      ]
    }),
    CaptainModule,
    TeamModule,
    EventModule,
    PictureModule,
    AuthModule,
    ActivityModule,
    ArticleModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
