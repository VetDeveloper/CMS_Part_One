import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .addOAuth2()
    .setTitle('CMS Part 1')
    .setDescription('CMS for content management for screens')
    .setVersion('1.0')
    .addTag('Purr')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  AWS.config.update({
    region: configService.get('YANDEX_CLOUD_REGION'),
    accessKeyId: configService.get('YANDEX_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('YANDEX_SECRET_ACCESS_KEY'),
    signatureVersion: configService.get('YANDEX_SIGNATURE_VERSION'),
  });

  await app.listen(5000, () => console.log(`Server started on port 5000`));
}
bootstrap();
