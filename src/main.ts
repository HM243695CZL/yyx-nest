import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { logger } from './middleware/logger.middleware';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );
  app.useStaticAssets(join(__dirname, '..', 'public/upload/'), {
    prefix: '/public/upload/' // 设置虚拟路径
  });

  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));

  // 监听所有的请求路由，并打印日志
  app.use(logger);

  // 处理跨域问题
  app.enableCors();

  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor());

  // 全局路由前缀
  // app.setGlobalPrefix('api');

  // 设置swagger文档相关配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('yyx-nest 接口API')
    .setDescription('yyx-nest 项目接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
