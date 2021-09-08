import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    {
      cors: {
        origin: 'http://localhost:8080'
      },
    },
  );
  const { port } = config();

  await app.listen(port);
}

bootstrap();
