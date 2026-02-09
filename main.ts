import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // construção do servidor

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal API')
  .setDescription(`
    API REST para plataforma de blog com autenticação JWT, controle de acesso por perfil
    e persistência em PostgreSQL.

    Projeto focado em boas práticas de arquitetura, organização de domínios
    e documentação automática.
  `)
  .setContact(
    'Thays Peixoto | Frontend & Software Developer',
    'https://www.linkedin.com/in/thays-peixoto-da-silva/',
    'thabysilva12@gmail.com'
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  // ajusta o horário do Brasil
  process.env.TZ = '-03:00';

  //adiciona validação de toda entrada de dados
  app.useGlobalPipes(new ValidationPipe());

  //limita ou libera acesso ao serviço da minha API/back and
  app.enableCors();

  //abertura de porta para receber dados
  await app.listen(process.env.PORT ?? 4002);
}
bootstrap();
