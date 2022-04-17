import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screen } from './screen.entity';
import { PlaylistModule } from 'src/playlist/playlist.module';
import { ScreenReposityry } from './screen.reposityry';

@Module({
  providers: [ScreenService],
  controllers: [ScreenController],
  imports: [TypeOrmModule.forFeature([ScreenReposityry]), PlaylistModule],
  exports: [ScreenService],
})
export class ScreenModule {}
