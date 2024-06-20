import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { LISTEN_PORT } from './config/envs';
import { swaggerConfig } from './config/swagger';
// import { GlobalExceptionFilter } from './middlewares/globalException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(new LoggerMiddleware().use);
  // app.useGlobalFilters(new GlobalExceptionFilter());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = Number(LISTEN_PORT);

  await app.listen(port);
}
bootstrap();
