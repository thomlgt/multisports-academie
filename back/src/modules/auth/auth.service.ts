import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CaptainService } from '../captain/captain.service';
import { CreateCaptain } from '../captain/dtos/createCaptain';
import { LoginCaptain } from '../captain/dtos/loginCaptain';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private captainService : CaptainService,
        private jwtService: JwtService
    ) {}

    /**
     * Cette méthode vérifie les informations de connexion
     * d'un utilisateur
     * @param email 
     * @param password 
     * @returns 
     */
    async validateUser(email: string, password: string) {
        let captainExist = await this.checkEmailLogin(email);
        //Vérifier que le mot de passe entré correspond au mot de passe en base de données
        //const isMatching = await bcrypt.compare(password, captainExist.password);
        const isMatching = (password === captainExist.password);
        // Si les mots de passes ne correspondent pas, throw erreur
        if(!isMatching) {
            throw new UnauthorizedException("Le mot de passe est incorrect.");
        }

        return captainExist;
    }

    /**
     * Permet de connecter un utilisateur
     * @param loginCaptain 
     * @returns 
     */
    async login(loginCaptain: LoginCaptain) {
        let captain = await this.captainService.findByEmail(loginCaptain.email);
        return this.generateToken(captain._id, captain.firstname, captain.lastname, captain.gender);
    }

    /**
     * Cette méthode permet à un utilisateur de créer un compte
     * et d'y être directement connecté
     * @param createCaptain 
     */
    async register(createCaptain: CreateCaptain) {
        await this.checkEmailRegister(createCaptain.email);
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
