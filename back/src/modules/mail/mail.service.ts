import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateCaptain } from '../captain/dto/create-captain.dto';
import { SafeCaptain } from '../captain/dto/safe-captain.dto';
import { Captain } from '../captain/entities/captain.entity';
import { Contact } from '../contact/models/contact.entity';

@Injectable()
export class MailService {

  constructor(private mailerService: MailerService) { }

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

  async sendAdminContactForm(contact: Contact) {
    await this.mailerService.sendMail({
      to: "contact@multisports-academie.Fr",
      from: `"${contact.firstname} ${contact.lastname}" <${contact.email}>`, // override default from
      subject: `${contact.subject}`,
      template: '../templates/contact', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        firstname: contact.firstname,
        lastname: contact.lastname,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        message: contact.message,
      },
    });
  }

  async sendClientContactForm(contact: Contact) {
    await this.mailerService.sendMail({
      to: `${contact.email}`,
      from: '"Multisports Académie" <ne-pas-repondre@multisports-academie.fr>', // override default from
      subject: `Votre demande a bien été prise en compte`,
      template: '../templates/contact-confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        firstname: contact.firstname,
        lastname: contact.lastname,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        message: contact.message,
      },
    });
  }
}
