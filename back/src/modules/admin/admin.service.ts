import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {

    constructor(
        private jwtService: JwtService
    ) {}

    /**
     * Permet de connecter un administrateur
     * @param admin 
     * @returns 
     */
     async login(admin: Admin) {
        const isMatch = (admin.username === jwtConstants.adminUsername) && (admin.password === jwtConstants.adminPassword)
        if(!isMatch) {
            throw new BadRequestException("Le mot de passe ou le nom d'utilisateur est incorrect.");
        }

        return this.generateAdminToken();
    }

    /**
     * Cette méthode génère un token avec les informations d'un utilisateur
     * @returns 
     */
     generateAdminToken() {
        const payload = {
            username : jwtConstants.adminUsername,
            password : jwtConstants.adminPassword
        } 

        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
