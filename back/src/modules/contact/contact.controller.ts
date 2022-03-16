import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './models/contact.entity';

@Controller('contact')
export class ContactController {

    constructor(private contactService: ContactService) {}

    @Post()
    async sendContactForm(@Body() contact: Contact) {
        return await this.contactService.sendContactForm(contact);
    }
}
