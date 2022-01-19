import { Module } from '@nestjs/common';
import { CaptainService } from './captain.service';
import { CaptainController } from './captain.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Captain, CaptainSchema } from './models/captain.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name : Captain.name, schema : CaptainSchema }
      ])
    ],
    
  providers: [CaptainService],
  controllers: [CaptainController]
})
export class CaptainModule {}
