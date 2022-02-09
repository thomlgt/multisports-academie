import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'ssl0.ovh.net',
        secure: false,
        auth: {
          user: 'contact@multisports-academie.fr',
          pass: 'Contact.fr59',
        },
      },
      defaults: {
        from: '"Multisports Académie" <contact@multisports-academie.fr>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [
    MailService
  ],
  exports : [
    MailService
  ]
})
export class MailModule {}
