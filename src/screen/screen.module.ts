import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screen } from './screen.entity';
import { PlaylistModule } from 'src/playlist/playlist.module';

@Module({
  providers: [ScreenService],
  controllers: [ScreenController],
  imports: [TypeOrmModule.forFeature([Screen]), PlaylistModule],
  exports: [ScreenService],
})
export class ScreenModule {}
