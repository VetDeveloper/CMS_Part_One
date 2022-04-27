import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as AWS from 'aws-sdk';

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

  // AWS.config.update({
  //   region: 'eu-central-1',
  //   accessKeyId: 'YCAJE_SP9iKUzHf_QpVdDUrzR',
  //   secretAccessKey: 'YCPTAdBgqcKOWQ5ZReXVEs6BRGJ_-lhhriRP2JSk',
  // });

  await app.listen(5000, () => console.log(`Server started on port 5000`));
}
bootstrap();
