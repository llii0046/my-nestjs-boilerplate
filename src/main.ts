import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { Logger } from '@nestjs/common';
import { LoggerService } from './shares/logger/logger.service';

const SERVER_PORT = process.env.SERVER_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // or the address of your front-end if different
    credentials: true,
  });
  app.useLogger(app.get(LoggerService));
  setupSwagger(app);
  await app.listen(SERVER_PORT, '0.0.0.0');
  const serverUrl = await app.getUrl();
  Logger.log(`The API service has started, please visit: ${serverUrl}`);
  Logger.log(
    `The API documentation has been generated, please visit: ${serverUrl}/${process.env.SWAGGER_PATH}/`,
  );
}
bootstrap();
