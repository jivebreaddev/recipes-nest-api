import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LocalStrategy } from './auth/local.strategy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const passport = require('passport');
  const cookieParser = require('cookie-parser');
  passport.use(LocalStrategy);
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Recipe API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
