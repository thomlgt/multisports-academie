import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CaptainService } from '../captain/captain.service';
import { CreateCaptain } from '../captain/dtos/createCaptain';
import { LoginCaptain } from '../captain/dtos/loginCaptain';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginCaptain : LoginCaptain) {
        return this.authService.login(loginCaptain);
    }

    @Post('register')
    async register(@Body() createCaptain : CreateCaptain) {
        return this.authService.register(createCaptain);
    }
}
