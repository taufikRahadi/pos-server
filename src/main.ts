import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './application/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService)

  const port: number = configService.get<number>('PORT') | 8080

  app.setGlobalPrefix('/api')
  app.enableCors({
    origin: ['http://localhost:8081', 'http://localhost:8082']
  })

  app.useStaticAssets('public')

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      const messages = errors.map(error => Object.values(error.constraints));
      throw new BadRequestException(messages.join(", "));
    }
  }))

  await app.listen(port);
  console.log(`app is running on port ${port}`)
}
bootstrap();
