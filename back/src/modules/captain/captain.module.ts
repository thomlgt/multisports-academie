import { Module } from '@nestjs/common';
import { CaptainService } from './captain.service';
import { CaptainController } from './captain.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Captain, CaptainSchema } from './entities/captain.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name : Captain.name, schema : CaptainSchema }
      ])
    ],
  exports: [CaptainService],
  providers: [CaptainService],
  controllers: [CaptainController]
})
export class CaptainModule {}
