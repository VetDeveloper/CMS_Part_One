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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseScreenDTO } from './dto/response-screen.dto';

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
      decorators: [
        UseGuards(JwtAuthGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: responseScreenDTO }),
      ],
    },
    createManyBase: {
      decorators: [
        UseGuards(JwtAuthGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: [responseScreenDTO] }),
      ],
    },
    updateOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, ScreenOwnerGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: responseScreenDTO }),
      ],
    },
    replaceOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, ScreenOwnerGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 200, type: responseScreenDTO }),
      ],
    },
    deleteOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, ScreenOwnerGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 200, type: responseScreenDTO }),
      ],
    },
    getOneBase: {
      decorators: [ApiResponse({ status: 200, type: responseScreenDTO })],
    },
    getManyBase: {
      decorators: [ApiResponse({ status: 200, type: [responseScreenDTO] })],
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
