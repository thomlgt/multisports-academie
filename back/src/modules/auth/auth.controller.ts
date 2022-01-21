import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CaptainService } from '../captain/captain.service';
import { LoginCaptain } from '../captain/dtos/loginCaptain';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {

    constructor(private captainService : CaptainService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginCaptain : LoginCaptain) {
        return loginCaptain;
    }
}
