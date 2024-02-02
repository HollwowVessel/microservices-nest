import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { setApp } from './app';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const configService = app.get(ConfigService);

  await app.listen(configService.getOrThrow<string>('PORT'));
  setApp(app);
}
bootstrap();
