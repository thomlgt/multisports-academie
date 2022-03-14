import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CaptainModule } from '../captain/captain.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    CaptainModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '2h'}
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
