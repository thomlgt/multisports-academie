import { Body, Controller, Get, Post } from '@nestjs/common';
import { Team } from './models/team.schema';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {

    constructor(private teamService : TeamService) {}

    @Get()
    async findAll() {
        return this.teamService.findAll();
    }

    @Post()
    async create(@Body() team : Team) {
        return this.teamService.create(team);
    }
}
