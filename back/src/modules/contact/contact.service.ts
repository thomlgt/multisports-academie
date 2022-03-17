import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { Contact } from './models/contact.entity';

@Injectable()
export class ContactService {

    constructor(private mailService: MailService) {}

    async sendContactForm(contact: Contact) {
        return await this.mailService.sendAdminContactForm(contact).then(async () => {
            await this.mailService.sendClientContactForm(contact)
        })
    }
}
