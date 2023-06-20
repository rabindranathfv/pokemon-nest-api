import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  const configServ = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const PORT = configServ.get<number>('PORT');
  console.log('🚀 ~ file: main.ts:21 ~ bootstrap ~ PORT:', PORT);
  const NODE_ENV = configServ.get<string>('NODE_ENV');
  console.log('🚀 ~ file: main.ts:23 ~ bootstrap ~ NODE_ENV:', NODE_ENV);
  await app.listen(PORT);
}
bootstrap();
