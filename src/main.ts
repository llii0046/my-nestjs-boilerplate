import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { Logger } from '@nestjs/common';

const SERVER_PORT = process.env.SERVER_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(SERVER_PORT, '0.0.0.0');
  const serverUrl = await app.getUrl();
  Logger.log(`The API service has started, please visit: ${serverUrl}`);
  Logger.log(
    `The API documentation has been generated, please visit: ${serverUrl}/${process.env.SWAGGER_PATH}/`,
  );
}
bootstrap();
