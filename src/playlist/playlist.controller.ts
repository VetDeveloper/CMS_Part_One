import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PlaylistOwnerGuard } from 'src/playlist/guards/playlistOwner.guard';
import { UserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/users.entity';
import { PlaylistDTO } from './dto/playlist.dto';
import { ResponsePlaylistDTO } from './dto/response-playlist.dto';
import { Playlist } from './playlist.entity';
import { PlaylistService } from './playlist.service';

@Crud({
  model: {
    type: PlaylistDTO,
  },
  serialize: {
    update: ResponsePlaylistDTO,
    get: ResponsePlaylistDTO,
    delete: ResponsePlaylistDTO,
    create: ResponsePlaylistDTO,
    replace: ResponsePlaylistDTO,
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
  persist: (user: UserDTO) => ({
    userId: user?.id,
  }),
})
@ApiTags('Playlist')
@Controller('playlists')
export class PlaylistController implements CrudController<PlaylistDTO> {
  constructor(public service: PlaylistService) {}
}
