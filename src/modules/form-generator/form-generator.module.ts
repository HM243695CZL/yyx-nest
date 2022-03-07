import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormGeneratorController } from './form-generator.controller';
import { FormGeneratorService } from './form-generator.service';
import { FormGeneratorEntity } from '../../entity/formGenerator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormGeneratorEntity])],
  controllers: [FormGeneratorController],
  providers: [FormGeneratorService]
})
export class FormGeneratorModule {}
