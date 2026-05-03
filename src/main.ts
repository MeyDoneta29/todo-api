import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Supprime les champs qui ne sont pas dans le DTO
    forbidNonWhitelisted: true, // Rejette la requête si des champs inconnus sont envoyés
    transform: true, // Transforme automatiquement les types (ex: string vers number)
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
