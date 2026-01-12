import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // construção do servidor

  // ajusta o horário do Brasil
  process.env.TZ = '-03:00';

  //adiciona validação de toda entrada de dados
  app.useGlobalPipes(new ValidationPipe());

  //limita ou libera acesso ao serviço da minha API/back and
  app.enableCors();

  //abertura de porta para receber dados
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
