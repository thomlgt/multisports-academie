import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CaptainService } from './captain.service';
import { CreateCaptain } from './dtos/createCaptain';
import { Captain } from './models/captain.schema';

@ApiTags('captains')
@Controller('captains')
export class CaptainController {

    constructor(private captainService: CaptainService) { }

    @Post()
    async create(@Body() captain: CreateCaptain) {
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
