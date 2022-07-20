import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
dotenv.config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Documentation Initialization
  const config = new DocumentBuilder()
    .setTitle('Staff scheduling')
    .setDescription('The staff scheduling API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
