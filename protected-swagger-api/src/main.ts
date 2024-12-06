import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as expressBasicAuth from 'express-basic-auth';

function myAuthorizer(username, password) {
  console.log(username, password);
  const userMatches = expressBasicAuth.safeCompare(username, 'admin');
  const passwordMatches = expressBasicAuth.safeCompare(
    password,
    'custompassword',
  );
  console.log(userMatches, passwordMatches);
  return userMatches === true && passwordMatches === true;
}

async function configSwagger(app: NestExpressApplication) {
  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  app.use(
    '/api*',
    expressBasicAuth({
      authorizer: myAuthorizer,
      challenge: true,
      unauthorizedResponse: 'Unauthorized',
    }),
  );

  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await configSwagger(app);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
