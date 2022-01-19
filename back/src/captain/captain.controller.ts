import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CaptainService } from './captain.service';
import { Captain } from './models/captain.schema';

@Controller('captains')
export class CaptainController {

    constructor(private captainService: CaptainService) { }

    @Post()
    async create(@Body() captain: Captain) {
        return this.captainService.create(captain);
    }

    @Get()
    async findAll() {
        return this.captainService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id : string) {
        return this.captainService.findById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id : string) {
        return this.captainService.delete(id);
    }

    @Patch(':id')
    async update(@Param('id') id : string, @Body() captain : Captain) {
        return this.captainService.update(id, captain);
    }
}
