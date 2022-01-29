import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CaptainService } from './captain.service';
import { CreateCaptain } from './dto/create-captain.dto';
import { UpdateEmailCaptain } from './dto/update-email-captain.dto';
import { Captain } from './entities/captain.entity';

@ApiTags('captains')
@Controller('captains')
export class CaptainController {

    constructor(private captainService: CaptainService) { }

    /**
     * Crée un nouveau capitaine
     * @param captain 
     * @returns 
     */
    @ApiBody({
        type: CreateCaptain,
        description: "l'objet Capitaine à creer",
    })
    @Post()
    async create(@Body() captain: CreateCaptain) {
        return this.captainService.create(captain);
    }

    /**
     * Retourne tous les capitaines en base
     * @returns 
     */
    @Get()
    async findAll() {
        return this.captainService.findAll();
    }

    /**
     * retourne un capitaine à partir de son id
     * @param id 
     * @returns 
     */
    @Get(':id')
    async findById(@Param('id') id : string) {
        return this.captainService.findById(id);
    }

    /**
     * supprime un capitaine à partir de son id
     * @param id 
     * @returns 
     */
    @Delete(':id')
    async delete(@Param('id') id : string) {
        return this.captainService.delete(id);
    }

    /**
     * modifie un capitaine
     * @param id 
     * @param captain 
     * @returns 
     */
    @Patch(':id/email')
    async updateEmail(@Param('id') id : string, @Body() captain : UpdateEmailCaptain) {
        return this.captainService.updateEmail(id, captain);
    }
}
