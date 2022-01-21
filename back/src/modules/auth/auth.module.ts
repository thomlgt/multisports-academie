import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CaptainModule } from '../captain/captain.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [CaptainModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
