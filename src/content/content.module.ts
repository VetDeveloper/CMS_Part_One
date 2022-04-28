import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { Content } from './content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [ContentService],
  controllers: [ContentController],
  imports: [TypeOrmModule.forFeature([ContentRepository]), ConfigModule],
  exports: [ContentService],
})
export class ContentModule {}
