import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistContentController } from './playlist-content.controller';
import { PlaylistContent } from './playlist-content.entity';
import { PlaylistContentService } from './playlist-content.service';

@Module({
  controllers: [PlaylistContentController],
  providers: [PlaylistContentService],
  imports: [TypeOrmModule.forFeature([PlaylistContent])],
  exports: [PlaylistContentService],
})
export class PlaylistContentModule {}
