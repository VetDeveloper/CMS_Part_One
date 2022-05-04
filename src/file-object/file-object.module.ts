import { Module } from '@nestjs/common';
import { FileObjectService } from './file-object.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileObjectRepository } from './file-object.repository';

@Module({
  providers: [FileObjectService],
  imports: [ConfigModule, TypeOrmModule.forFeature([FileObjectRepository])],
  exports: [FileObjectService],
})
export class FileObjectModule {}
