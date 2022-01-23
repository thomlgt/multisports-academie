import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateEvent } from './dto/create-event.dto';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';

@ApiTags('events')
@Controller('events')
export class EventController {

    constructor(private eventService: EventService) { }

    /**
     * Crée un nouvel événement
     * @param event 
     * @returns 
     */
    @ApiBody({
        type: CreateEvent,
        description: "l'objet Event à creer",
    })
    @Post()
    async create(@Body() event: CreateEvent) {
        return this.eventService.create(event);
    }

    /**
     * retourne tous les événements en base
     * @returns Retourne tous les événements en base
     */
    @Get()
    async findAll() {
        return this.eventService.findAll();
    }

    /**
     * tourne un événement à partir de son id
     * @param id 
     * @returns 
     */
    @Get(':id')
    async findById(@Param('id') id : string) {
        return this.eventService.findById(id);
    }

    /**
     * supprime un événement à partir de son id
     * @param id 
     * @returns 
     */
    @Delete(':id')
    async delete(@Param('id') id : string) {
        return this.eventService.delete(id);
    }

    /**
     * Modifie un événement
     * @param id 
     * @param event 
     * @returns 
     */
    @Patch(':id')
    async update(@Param('id') id : string, @Body() event : Event) {
        return this.eventService.update(id, event);
    }


}
