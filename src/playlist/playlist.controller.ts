import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PlaylistOwnerGuard } from 'src/auth/guards/playlistOwner.guard';
import { User } from 'src/user/users.entity';
import { Playlist } from './playlist.entity';
import { PlaylistService } from './playlist.service';

@Crud({
  model: {
    type: Playlist,
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase', 'deleteOneBase'],
    updateOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, PlaylistOwnerGuard),
        ApiBearerAuth(),
      ],
    },
    replaceOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, PlaylistOwnerGuard),
        ApiBearerAuth(),
      ],
    },
  },
})
@CrudAuth({
  property: 'user',
  persist: (user: User) => ({
    userId: user?.id,
  }),
})
@ApiTags('Playlist')
@Controller('playlists')
export class PlaylistController implements CrudController<Playlist> {
  constructor(public service: PlaylistService) {}
}
