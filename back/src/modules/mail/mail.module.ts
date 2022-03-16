import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

const MAIL_PASSWORD = process.env.MAIL_PASSWORD || "root";
const MAIL_HOST = process.env.MAIL_HOST || "ssl0.localhost.net";

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: MAIL_HOST,
        secure: false,
        auth: {
          user: 'contact@multisports-academie.fr',
          pass: MAIL_PASSWORD,
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
