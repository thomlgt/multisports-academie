import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { Registration } from './entities/registration';

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
        type: CreateEventDto,
        description: "l'objet Event à creer",
    })
    @Post()
    async create(@Body() event: CreateEventDto) {
        return this.eventService.create(event);
    }

    /**
     * retourne tous les événements en base
     * @returns
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
     * Retourne les evenements en fonction de l'id d'une équipe inscrite
     * @param id 
     * @returns 
     */
     @Get('team/:id')
     async findByTeamRegistration(@Param('id') id : string) {
         return this.eventService.findByTeamRegistration(id);
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

    /**
     * Ajoute une nouvelle inscription à un événement existant
     * @param registration 
     * @param id 
     * @returns 
     */
    @ApiBody({
        type: Registration,
        description: "l'objet membre à ajouter",
    })
    @Post(':id/registrations')
    async addRegistration(@Body() registration: Registration, @Param('id') id: string) {
    return this.eventService.addRegistration(id, registration);
    
    }

    /**
     * supprime une inscription d'un événement
     * @param registration 
     * @param id 
     * @returns 
     */
    @Delete(':id/registrations')
    async deleteRegistration(@Body() registration: Registration, @Param('id') id: string) {
        return this.eventService.deleteRegistration(id, registration);
    }

}
