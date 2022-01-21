import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEvent } from './dtos/createEvent';
import { EventService } from './event.service';
import { Event } from './models/event.schema';

@ApiTags('events')
@Controller('events')
export class EventController {

    constructor(private eventService: EventService) { }

    @Post()
    async create(@Body() event: CreateEvent) {
        return this.eventService.create(event);
    }

    @Get()
    async findAll() {
        return this.eventService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id : string) {
        return this.eventService.findById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id : string) {
        return this.eventService.delete(id);
    }

    @Patch(':id')
    async update(@Param('id') id : string, @Body() event : Event) {
        return this.eventService.update(id, event);
    }


}
