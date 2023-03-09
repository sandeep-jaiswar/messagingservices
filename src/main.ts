import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`${process.env.RABBITMQ_URL}`],
        queue: 'cats_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
