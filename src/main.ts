import {loadEnvironmentVariables} from '@libs/bootstrap';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
  try {
    await loadEnvironmentVariables();
  } catch (err) {
    console.error(err);

    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/v1');

  // TODO : Attach health-checker
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
