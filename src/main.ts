import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'https://notes-app-frontend-qjkfjkawhq-as.a.run.app',
    },
  });
  const { port } = config();

  await app.listen(port);
}

bootstrap();
