import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });
  //Validation des champs avec class-validator
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //Configuration Swagger UI
  const config = new DocumentBuilder()
    .setTitle('Multisports Académie')
    .setDescription("Liste des requêtes de l'API Rest Multisports Académie")
    .setVersion('1.0')
    .addTag('activities')
    .addTag('articles')
    .addTag('captains')
    .addTag('events')
    .addTag('pictures')
    .addTag('teams')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3000);
  
}
bootstrap();
