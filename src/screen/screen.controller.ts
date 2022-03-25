import { Controller, UseGuards } from '@nestjs/common';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/users.entity';
import { Screen } from './screen.entity';
import { ScreenService } from './screen.service';
import { ScreenOwnerGuard } from 'src/auth/guards/screenOwner.guard';
import { PlaylistService } from 'src/playlist/playlist.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: Screen,
  },

  params: {
    eventId: {
      field: 'eventId',
      type: 'number',
    },
  },

  routes: {
    createOneBase: {
      decorators: [UseGuards(JwtAuthGuard), ApiBearerAuth()],
    },
    createManyBase: {
      decorators: [UseGuards(JwtAuthGuard), ApiBearerAuth()],
    },
    updateOneBase: {
      decorators: [UseGuards(JwtAuthGuard, ScreenOwnerGuard), ApiBearerAuth()],
    },
    replaceOneBase: {
      decorators: [UseGuards(JwtAuthGuard, ScreenOwnerGuard), ApiBearerAuth()],
    },
    deleteOneBase: {
      decorators: [UseGuards(JwtAuthGuard, ScreenOwnerGuard), ApiBearerAuth()],
    },
  },
})
@CrudAuth({
  property: 'user',
  persist: (user: User) => ({
    userId: user?.id,
  }),
})
@ApiTags('Screens')
@Controller('events/:eventId/screens')
export class ScreenController implements CrudController<Screen> {
  constructor(
    public service: ScreenService,
    public playlistService: PlaylistService,
  ) {}

  get base(): CrudController<Screen> {
    return this;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Override()
  async createOne(@ParsedRequest() req: CrudRequest): Promise<Screen> {
    const dto: Screen = new Screen();
    const screen: Screen = await this.base.createOneBase(req, dto);
    await this.playlistService.createOneByScreen({
      userId: screen.userId,
      screenId: screen.id,
    });
    return screen;
  }
}
