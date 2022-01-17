import { MikroORM } from '@mikro-orm/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // this will transform query parameters to the right object. Ex. 2019-09-07 to Date automatically
  // and apply any validator Ex. @IsDate()
  await initDbForDev(app);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();

async function initDbForDev(app: INestApplication) {
  const orm = app.get<MikroORM>(MikroORM);
  const generator = orm.getSchemaGenerator();
  try {
    await generator.createSchema();
  } catch {}
  try {
    await generator.updateSchema();
  } catch {}
}
