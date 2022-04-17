import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { Content } from './content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';

@Module({
  providers: [ContentService],
  controllers: [ContentController],
  imports: [TypeOrmModule.forFeature([ContentRepository])],
  exports: [ContentService],
})
export class ContentModule {}
