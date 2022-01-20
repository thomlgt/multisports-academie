import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Member } from './models/member';
import { Team } from './models/team.schema';
import { TeamService } from './team.service';

@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get()
  async findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.teamService.findById(id);
  }

  @Post()
  async create(@Body() team: Team) {
    return this.teamService.create(team);
  }

  @Post(':id/members')
  async addMember(@Body() member: Member, @Param('id') id: string) {
    return this.teamService.addMember(id, member);
  }

  @Delete(':id/members')
  async deleteMember(@Body() member: Member, @Param('id') id: string) {
    return this.teamService.deleteMember(id, member);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.teamService.delete(id);
  }

  @Patch(':id/name/:name')
  async updateName(@Param('id') id: string, @Param('name') name: string) {
    return this.teamService.updateName(id, name);
  }
}
