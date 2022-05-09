import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from '../admin/jwt-admin-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
    @Get()
    @UseGuards(AuthGuard("admin"))
    async findAll() {
        return this.captainService.findAll();
    }

    /**
     * retourne un capitaine à partir de son id
     * @param id 
     * @returns 
     */
    @Get(':id')
    @UseGuards(AuthGuard(["admin", "captain"]))
    async findById(@Param('id') id : string) {
        return this.captainService.findById(id);
    }

    /**
     * supprime un capitaine à partir de son id
     * @param id 
     * @returns 
     */
    @Delete(':id')
    @UseGuards(AuthGuard("admin"))
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
    @UseGuards(AuthGuard("captain"))
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
     @UseGuards(AuthGuard("captain"))
     async updatePassword(@Param('id') id : string, @Body() captain : UpdatePasswordCaptain) {
         return this.captainService.updatePassword(id, captain);
     }
}
