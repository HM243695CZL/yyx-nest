import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from 'nestjs-config';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './modules/login/login.module';
import { CommonModule } from './modules/common/common.module';
import { MenuModule } from './modules/menu/menu.module';
import { FormGeneratorModule } from './modules/form-generator/form-generator.module';
import { IconModule } from './modules/icon/icon.module';
import { CategoryModule } from './modules/category/category.module';
import { GoodsTypeModule } from './modules/goods-type/goods-type.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),
    AuthModule,
    LoginModule,
    CommonModule,
    MenuModule,
    FormGeneratorModule,
    IconModule,
    CategoryModule,
    GoodsTypeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
