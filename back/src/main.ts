import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

const API_PORT = process.env.API_PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  //Validation des champs avec class-validator
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (NODE_ENV !== 'production') {
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
  }
  app.enableCors();
  await app.listen(API_PORT);

}
bootstrap();
