import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  // 设置swagger文档相关配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('yyx-nest 接口API')
    .setDescription('yyx-nest 项目接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
