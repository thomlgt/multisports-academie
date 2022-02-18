import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateCaptain } from '../captain/dto/create-captain.dto';
import { SafeCaptain } from '../captain/dto/safe-captain.dto';
import { Captain } from '../captain/entities/captain.entity';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) {}

    async sendCaptainRegistrationConfirmation(captain: CreateCaptain) {
    
        await this.mailerService.sendMail({
          to: captain.email,
          // from: '"Support Team" <support@example.com>', // override default from
          subject: 'Confirmation d\'inscription',
          template: '../templates/registration', // `.hbs` extension is appended automatically
          context: { // ✏️ filling curly brackets with content
            firstname: captain.firstname,
          },
        });
      }
}
