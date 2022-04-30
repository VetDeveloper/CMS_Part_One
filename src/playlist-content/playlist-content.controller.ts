import { Body, Controller, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { PlaylistContentOwnerGuard } from 'src/playlist-content/guards/playlist-content-owner.guard';
import { UserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/users.entity';
import { CreatePlaylistContentDTO } from './dto/create-playlist-content.dto';
import { PlaylistContentDTO } from './dto/playlist-content.dto';
import { ResponsePlaylistContentDTO } from './dto/response-playlist.dto';
import { UpdatePlaylistContentDTO } from './dto/update-playlist-content.dto';
import { PlaylistContent } from './playlist-content.entity';
import { PlaylistContentService } from './playlist-content.service';
import { GetUser } from '../commons/decorators/get-user';
import { UpdateGuard } from './guards/can-update.guard';

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
    createManyBase: {
      decorators: [UseGuards(JwtAuthGuard)],
    },
    updateOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, PlaylistContentOwnerGuard, UpdateGuard),
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Override('createOneBase')
  async createOnePC(
    @Body() dto: CreatePlaylistContentDTO,
    @GetUser('id') userId: number,
  ) {
    return this.service.createOnePC(dto, userId);
  }
}
