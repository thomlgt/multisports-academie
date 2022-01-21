import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import { CaptainService } from '../captain/captain.service';
import { CreateCaptain } from '../captain/dtos/createCaptain';
import { LoginCaptain } from '../captain/dtos/loginCaptain';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SafeCaptain } from '../captain/dtos/safeCaptain';

@Injectable()
export class AuthService {

    constructor(private captainService : CaptainService) {}

    async validateUser(email: string, password: string) {
        
        let captainExist = await this.captainService.findByEmail(email);
        //Si l'utilisateur est null, email n'existe pas en bdd
        if(!captainExist) {
            throw new BadRequestException("Aucun compte avec cette adresse email n'a été trouvé.");
        }
        //Vérifier que le mot de passe entré correspond au mot de passe en base de données
        //const isMatching = await bcrypt.compare(password, captainExist.password);
        const isMatching = (password === captainExist.password);
        // Si les mots de passes ne correspondent pas, throw erreur
        if(!isMatching) {
            throw new UnauthorizedException("Le mot de passe est incorrect.");
        }

        return captainExist;
    }
}
