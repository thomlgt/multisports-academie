import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CaptainService } from './captain.service';
import { CreateCaptain } from './dto/create-captain.dto';
import { UpdatePasswordCaptain } from './dto/update-password-captain.dto';
import { UpdatePersonalCaptain } from './dto/update-personal-captain.dto';

@ApiTags('captains')
@Controller('captains')
export class CaptainController {

    constructor(private captainService: CaptainService) { }

    /**
     * Retourne tous les capitaines en base
     * @returns 
     */
    // @Get()
    // async findAll() {
    //     return this.captainService.findAll();
    // }

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
    @Patch(':id/personal')
    async updateEmail(@Param('id') id : string, @Body() captain : UpdatePersonalCaptain) {
        return this.captainService.updatePersonalInfos(id, captain);
    }

    /**
     * modifie un capitaine
     * @param id 
     * @param captain 
     * @returns 
     */
     @Patch(':id/password')
     async updatePassword(@Param('id') id : string, @Body() captain : UpdatePasswordCaptain) {
         return this.captainService.updatePassword(id, captain);
     }
}
