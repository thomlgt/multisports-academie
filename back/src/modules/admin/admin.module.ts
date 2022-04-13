import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { jwtConstants } from './constants';
import { JwtAdminStrategy } from './jwt-admin.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '2h'}
    })
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtAdminStrategy]
})
export class AdminModule {}
