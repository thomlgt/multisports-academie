import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './models/team.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name : Team.name, schema : TeamSchema }
      ])
    ],
  providers: [TeamService],
  controllers: [TeamController]
})
export class TeamModule {}
