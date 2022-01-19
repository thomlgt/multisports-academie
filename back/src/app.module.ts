import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CaptainModule } from './modules/captain/captain.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ms-db'),
    CaptainModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
