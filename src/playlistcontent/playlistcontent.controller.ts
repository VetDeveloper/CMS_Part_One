import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PlaylistContentOwnerGuard } from 'src/playlistcontent/guards/playlistContentOwner.guard';
import { UserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/users.entity';
import { CreatePlaylistContentDTO } from './dto/createplaylistContent.dto';
import { PlaylistContentDTO } from './dto/playlistcontent.dto';
import { ResponsePlaylistContentDTO } from './dto/responseplaylist.dto';
import { UpdatePlaylistContentDTO } from './dto/update-playlistContent.dto';
import { PlaylistContent } from './playlistcontent.entity';
import { PlaylistContentService } from './playlistcontent.service';

@Crud({
  model: {
    type: PlaylistContentDTO,
  },
  serialize: {
    update: ResponsePlaylistContentDTO,
    get: ResponsePlaylistContentDTO,
    delete: ResponsePlaylistContentDTO,
    create: ResponsePlaylistContentDTO,
    replace: ResponsePlaylistContentDTO,
  },
  dto: {
    create: CreatePlaylistContentDTO,
    update: UpdatePlaylistContentDTO,
    replace: CreatePlaylistContentDTO,
  },
  routes: {
    createOneBase: {
      decorators: [UseGuards(JwtAuthGuard), ApiBearerAuth()],
    },
    createManyBase: {
      decorators: [UseGuards(JwtAuthGuard)],
    },
    updateOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, PlaylistContentOwnerGuard),
        ApiBearerAuth(),
      ],
    },
    replaceOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, PlaylistContentOwnerGuard),
        ApiBearerAuth(),
      ],
    },
    deleteOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, PlaylistContentOwnerGuard),
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
@ApiTags('PlaylistContent')
@Controller('playlist-contents')
export class PlaylistContentController
  implements CrudController<PlaylistContentDTO>
{
  constructor(public service: PlaylistContentService) {}
}
