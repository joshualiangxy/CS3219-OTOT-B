import { NestFactory } from '@nestjs/core';
import isEmpty from 'lodash/isEmpty';
import { AppModule } from './app.module';
import config from './config';

interface NestOptions {
  cors?: { origin: string; };
}

async function bootstrap() {
  const { port, corsOrigin: origin } = config();
  const options: NestOptions = {};

  if (!isEmpty(origin)) options.cors = { origin };

  const app = await NestFactory.create(AppModule, options);

  await app.listen(port);
}

bootstrap();
