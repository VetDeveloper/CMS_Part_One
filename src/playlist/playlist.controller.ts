import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PlaylistOwnerGuard } from 'src/auth/guards/playlistOwner.guard';
import { User } from 'src/user/users.entity';
import { ResponsePlaylistDto } from './dto/create-playlist.dto';
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
        ApiResponse({ status: 201, type: ResponsePlaylistDto }),
      ],
    },
    replaceOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, PlaylistOwnerGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: ResponsePlaylistDto }),
      ],
    },
    getOneBase: {
      decorators: [ApiResponse({ status: 200, type: ResponsePlaylistDto })],
    },
    getManyBase: {
      decorators: [ApiResponse({ status: 200, type: [ResponsePlaylistDto] })],
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
