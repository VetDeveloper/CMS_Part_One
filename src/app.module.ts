import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/users.entity';
import { EventModule } from './event/event.module';
import { Event as Eventt } from './event/event.entity';
import { ScreenModule } from './screen/screen.module';
import { Screen } from './screen/screen.entity';
import { AuthModule } from './auth/auth.module';
import { PlaylistModule } from './playlist/playlist.module';
import { Playlist } from './playlist/playlist.entity';
import { PlaylistContentModule } from './playlist-content/playlist-content.module';
import { ContentModule } from './content/content.module';
import { Content } from './content/content.entity';
import { PlaylistContent } from './playlist-content/playlist-content.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({}),
    UserModule,
    EventModule,
    ScreenModule,
    AuthModule,
    PlaylistModule,
    PlaylistContentModule,
    ContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
