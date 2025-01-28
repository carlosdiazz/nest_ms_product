import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

//Propio
import { AppModule } from './app/app.module';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('MAIN');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve todo lo que no está incluído en los DTOs
      forbidNonWhitelisted: true, // Retorna bad request si hay propiedades en el objeto no requeridas
    }),
  );

  await app.listen(envs.PORT);
  logger.debug(`👍Server up => PORT => ${envs.PORT} 👍💪👍💪👍💪`);
}
void bootstrap();
