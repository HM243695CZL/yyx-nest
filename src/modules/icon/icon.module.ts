import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IconController } from './icon.controller';
import { IconService } from './icon.service';
import { IconEntity } from '../../entity/icon.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([IconEntity]),
    AuthModule,
  ],
  controllers: [IconController],
  providers: [IconService]
})
export class IconModule {}
