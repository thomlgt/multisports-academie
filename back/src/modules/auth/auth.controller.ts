import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CaptainService } from '../captain/captain.service';
import { CreateCaptain } from '../captain/dto/create-captain.dto';
import { LoginCaptain } from '../captain/dto/login-captain.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    /**
     * permet de se connecter
     * @param loginCaptain 
     * @returns 
     */
    @UseGuards(LocalAuthGuard)
    @ApiBody({
        type: LoginCaptain,
        description: "email et mot de passe",
    })
    @Post('login')
    async login(@Body() loginCaptain : LoginCaptain) {
        return this.authService.login(loginCaptain);
    }

    /**
     * permet de créer un nouveau compte
     * @param createCaptain 
     * @returns 
     */
    @ApiBody({
        type: CreateCaptain,
        description: "l'objet Capitaine nécessaire à la création du compte",
    })
    @Post('register')
    async register(@Body() createCaptain : CreateCaptain) {
        return this.authService.register(createCaptain);
    }
}
