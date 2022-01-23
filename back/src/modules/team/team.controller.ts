import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Member } from './entities/member';
import { Team } from './entities/team.entity';
import { TeamService } from './team.service';

@ApiTags('teams')
@Controller('teams')
export class TeamController {
  constructor(private teamService: TeamService) {}

  /**
   * retourne toutes les équipes en base
   * @returns 
   */
  @Get()
  async findAll() {
    return this.teamService.findAll();
  }

  /**
   * retourne une équipe à partir de son id
   * @param id 
   * @returns 
   */
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.teamService.findById(id);
  }

  /**
   * crée une nouvelle équipe
   * @param team 
   * @returns 
   */
  @ApiBody({
      type: Team,
      description: "l'objet image équipe à creer",
  })
  @Post()
  async create(@Body() team: Team) {
    return this.teamService.create(team);
  }

  /**
   * Ajoute un nouveau membre à une équipe existante
   * @param member 
   * @param id 
   * @returns 
   */
  @ApiBody({
      type: Member,
      description: "l'objet membre à ajouter",
  })
  @Post(':id/members')
  async addMember(@Body() member: Member, @Param('id') id: string) {
    return this.teamService.addMember(id, member);
  }

  /**
   * supprime un membre d'une équipe
   * @param member 
   * @param id 
   * @returns 
   */
  @Delete(':id/members')
  async deleteMember(@Body() member: Member, @Param('id') id: string) {
    return this.teamService.deleteMember(id, member);
  }

  /**
   * supprime une équipe à partir de son id
   * @param id 
   * @returns 
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.teamService.delete(id);
  }

  /**
   * change le nom d'une équipe à partir de son id
   * @param id 
   * @param name 
   * @returns 
   */
  @Patch(':id/name/:name')
  async updateName(@Param('id') id: string, @Param('name') name: string) {
    return this.teamService.updateName(id, name);
  }
}
