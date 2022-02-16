import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CaptainService } from '../captain/captain.service';
import { CreateCaptain } from '../captain/dto/create-captain.dto';
import { LoginCaptain } from '../captain/dto/login-captain.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private captainService : CaptainService,
        private jwtService: JwtService
    ) {}

    /**
     * Permet de connecter un utilisateur
     * @param loginCaptain 
     * @returns 
     */
    async login(loginCaptain: LoginCaptain) {
        let captain = await this.checkEmailLogin(loginCaptain.email);

        const isMatch = await bcrypt.compare(loginCaptain.password, captain.password);
        if(!isMatch) {
            throw new BadRequestException('Le mot de passe est incorrect.')
        }

        return this.generateToken(captain._id, captain.firstname, captain.lastname, captain.gender);
    }

    /**
     * Cette méthode permet à un utilisateur de créer un compte
     * et d'y être directement connecté
     * @param createCaptain 
     */
    async register(createCaptain: CreateCaptain) {
        await this.checkEmailRegister(createCaptain.email);
        //Cryptage du mot de passe
        const salt = await bcrypt.genSalt(10);
        createCaptain.password = await bcrypt.hash(createCaptain.password, salt);
        
        let captain = await this.captainService.create(createCaptain);
        return this.generateToken(captain._id, captain.firstname, captain.lastname, captain.gender);
    }

    /**
     * Cette méthode vérifie dans la base de données si un capitaine
     * correspond a l'adresse email entrée.
     * @param email 
     * @returns 
     */
    async checkEmailLogin(email: string) {
        let captainExist = await this.captainService.findByEmail(email);
        //Si l'utilisateur est null, email n'existe pas en bdd
        if(!captainExist) {
            throw new BadRequestException("Aucun compte avec cette adresse email n'a été trouvé.");
        }
        return captainExist;
    }

    /**
     * Cette méthode vérifie dans la base de données qu'aucun capitaine
     * avec cette adresse email existe.
     * @param email 
     * @returns 
     */
     async checkEmailRegister(email: string) {
        let captainExist = await this.captainService.findByEmail(email);
        //Si l'utilisateur est null, email n'existe pas en bdd
        if(captainExist) {
            throw new BadRequestException("Un compte avec cette adresse email existe déjà.");
        }
    }

    /**
     * Cette méthode génère un token avec les informations d'un utilisateur
     * @param id 
     * @param firstname 
     * @param lastname 
     * @param gender 
     * @returns 
     */
    generateToken(id: string, firstname: string, lastname: string, gender: number) {
        const payload = {
            _id: id,
            firstname: firstname,
            lastname: lastname,
            gender: gender
        } 

        return {
            access_token: this.jwtService.sign(payload),
            captain : payload
        };
    }
}
