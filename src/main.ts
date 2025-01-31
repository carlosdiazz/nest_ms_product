import { NestFactory } from '@nestjs/core';
import {
  Transport,
  MicroserviceOptions,
  RpcException,
} from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';

//Propio
import { AppModule } from './app/app.module';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('PRODUCTS-MAIN');
  console.log(envs);
  //const app = await NestFactory.create(AppModule);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      //transport: Transport.TCP,
      //options: {
      //  port: envs.PORT,
      //},
      transport: Transport.NATS,
      options: {
        servers: envs.NATS_SERVERS,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve todo lo que no está incluído en los DTOs
      forbidNonWhitelisted: true, // Retorna bad request si hay propiedades en el objeto no requeridas
      exceptionFactory: (errors) =>
        new RpcException({
          status: 400,
          message: errors
            .map((err) => Object.values(err.constraints ?? ''))
            .join(', '),
        }),
    }),
  );

  await app.listen();
  //await app.listen(envs.PORT);
  logger.debug(`👍Server up => PORT => ${envs.PORT} 👍💪👍💪👍💪`);
}
void bootstrap();
