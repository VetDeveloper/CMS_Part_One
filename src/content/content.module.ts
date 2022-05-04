import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { Content } from './content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';
import { ConfigModule } from '@nestjs/config';
import { FileObjectModule } from 'src/file-object/file-object.module';

@Module({
  providers: [ContentService],
  controllers: [ContentController],
  imports: [TypeOrmModule.forFeature([ContentRepository]), ConfigModule, FileObjectModule],
  exports: [ContentService],
})
export class ContentModule {}
