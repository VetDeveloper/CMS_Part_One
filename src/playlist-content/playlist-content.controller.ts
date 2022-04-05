import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PlaylistContentOwnerGuard } from 'src/auth/guards/playlistContentOwner.guard';
import { User } from 'src/user/users.entity';
import { CreatePlaylistContentDTO } from './dto/create-playlistContent.dto';
import { UpdatePlaylistContentDTO } from './dto/update-playlistContent.dto';
import { PlaylistContent } from './playlist-content.entity';
import { PlaylistContentService } from './playlist-content.service';

@Crud({
  model: {
    type: PlaylistContent,
  },
  dto: {
    create: CreatePlaylistContentDTO,
    update: UpdatePlaylistContentDTO,
    replace: CreatePlaylistContentDTO,
  },
  routes: {
    createOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: CreatePlaylistContentDTO }),
      ],
    },
    createManyBase: {
      decorators: [
        UseGuards(JwtAuthGuard),
        ApiResponse({ status: 201, type: [CreatePlaylistContentDTO] }),
      ],
    },
    updateOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, PlaylistContentOwnerGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: CreatePlaylistContentDTO }),
      ],
    },
    replaceOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, PlaylistContentOwnerGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: CreatePlaylistContentDTO }),
      ],
    },
    deleteOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, PlaylistContentOwnerGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: CreatePlaylistContentDTO }),
      ],
    },
    getOneBase: {
      decorators: [
        ApiResponse({ status: 200, type: CreatePlaylistContentDTO }),
      ],
    },
    getManyBase: {
      decorators: [
        ApiResponse({ status: 200, type: [CreatePlaylistContentDTO] }),
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
@ApiTags('PlaylistContent')
@Controller('playlist-contents')
export class PlaylistContentController
  implements CrudController<PlaylistContent>
{
  constructor(public service: PlaylistContentService) {}
}
