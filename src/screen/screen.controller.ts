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
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { User } from 'src/user/users.entity';
import { Screen } from './screen.entity';
import { ScreenService } from './screen.service';
import { ScreenOwnerGuard } from 'src/screen/guards/screen-owner.guard';
import { PlaylistService } from 'src/playlist/playlist.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ScreenModel } from './dto/screen.dto';
import { UserModel } from 'src/user/dto/user.dto';
import { ResponseScreenDTO } from './dto/response-creen.dto';

@Crud({
  model: {
    type: ScreenModel,
  },

  params: {
    eventId: {
      field: 'eventId',
      type: 'number',
    },
  },

  serialize: {
    update: ResponseScreenDTO,
    get: ResponseScreenDTO,
    delete: ResponseScreenDTO,
    create: ResponseScreenDTO,
    replace: ResponseScreenDTO,
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
  persist: (user: UserModel) => ({
    userId: user?.id,
  }),
})
@ApiTags('Screens')
@Controller('events/:eventId/screens')
export class ScreenController implements CrudController<ScreenModel> {
  constructor(
    public service: ScreenService,
    public playlistService: PlaylistService,
  ) {}

  get base(): CrudController<ScreenModel> {
    return this;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Override()
  async createOne(
    @ParsedRequest() req: CrudRequest,
  ): Promise<ResponseScreenDTO> {
    const dto: ScreenModel = new Screen();
    const screen: ScreenModel = await this.base.createOneBase(req, dto);
    await this.playlistService.createOneByScreen({
      userId: screen.userId,
      screenId: screen.id,
    });
    return screen;
  }
}
