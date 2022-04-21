import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateCaptain } from '../captain/dto/create-captain.dto';
import { Captain } from '../captain/entities/captain.entity';
import { Contact } from '../contact/models/contact.entity';
import { SafeEvent } from '../event/dto/safe-event.dto';
import { Registration } from '../event/entities/registration';

@Injectable()
export class MailService {

  constructor(private mailerService: MailerService) { }

  async sendCaptainRegistrationConfirmation(captain: CreateCaptain) {

    await this.mailerService.sendMail({
      to: captain.email,
      from: '"Multisports Académie" <ne-pas-repondre@multisports-academie.fr>',
      subject: 'Confirmation d\'inscription',
      template: '../templates/registration', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        firstname: captain.firstname,
      },
      attachments: [{
        filename: 'logo-sans-fond-bords-bleu.png',
        path: __dirname +'/images/logo-sans-fond-bords-bleu.png',
        cid: 'logo'
      }]
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
      attachments: [{
        filename: 'logo-sans-fond-bords-bleu.png',
        path: __dirname +'/images/logo-sans-fond-bords-bleu.png',
        cid: 'logo'
      }]
    });
  }

  async sendDeleteRegistration(captain: Captain, event : SafeEvent, registration : Registration) {
    await this.mailerService.sendMail({
      to: `${captain.email}`,
      from: '"Multisports Académie" <ne-pas-repondre@multisports-academie.fr>', // override default from
      subject: `Votre inscription a été annulée`,
      template: '../templates/delete-registration', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        firstname: captain.firstname,
        teamName: registration.team.name,
        eventName: event.name,
      },
      attachments: [{
        filename: 'logo-sans-fond-bords-bleu.png',
        path: __dirname +'/images/logo-sans-fond-bords-bleu.png',
        cid: 'logo'
      }]
    });
  }

  async sendAddRegistration(captain: Captain, event : SafeEvent, registration : Registration) {
    await this.mailerService.sendMail({
      to: `${captain.email}`,
      from: '"Multisports Académie" <ne-pas-repondre@multisports-academie.fr>', // override default from
      subject: `Confirmation de votre demande d'inscription`,
      template: '../templates/registration-confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        firstname: captain.firstname,
        teamName: registration.team.name,
        eventName: event.name,
        price: event.price
      },
      attachments: [{
        filename: 'logo-sans-fond-bords-bleu.png',
        path: __dirname +'/images/logo-sans-fond-bords-bleu.png',
        cid: 'logo'
      }]
    });
  }

  async sendValidatedRegistration(captain: Captain, event : SafeEvent, registration : Registration) {
    let address = `${event.place.address}, ${event.place.zipcode}, ${event.place.city.toUpperCase()}`;
    await this.mailerService.sendMail({
      to: `${captain.email}`,
      from: '"Multisports Académie" <ne-pas-repondre@multisports-academie.fr>', // override default from
      subject: `Validation de votre inscription`,
      template: '../templates/registration-validated', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        firstname: captain.firstname,
        teamName: registration.team.name,
        date: event.startEvent.toLocaleDateString('fr'),
        address: address,
        hour: event.startEvent.getHours(),
        minutes: event.startEvent.getMinutes()
      },
      attachments: [{
        filename: 'logo-sans-fond-bords-bleu.png',
        path: __dirname +'/images/logo-sans-fond-bords-bleu.png',
        cid: 'logo'
      }]
    });
  }
}
