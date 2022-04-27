import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { ContentOwnerGuard } from 'src/content/guards/content-owner.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/users.entity';
import { Content } from './content.entity';
import { ContentService } from './content.service';
import { ContentDTO } from './dto/content.dto';
import { CreateContentDTO } from './dto/create-content.dto';
import { ResponseContentDTO } from './dto/response-content.dto';
import { UpdateContentDTO } from './dto/update-content.dto';
import { CreateFileDTO } from './dto/create-file.dto';

@Crud({
  model: {
    type: ContentDTO,
  },
  serialize: {
    update: ResponseContentDTO,
    get: ResponseContentDTO,
    delete: ResponseContentDTO,
    create: ResponseContentDTO,
    replace: ResponseContentDTO,
  },
  dto: {
    create: CreateContentDTO,
    update: UpdateContentDTO,
    replace: CreateContentDTO,
  },
  routes: {
    createOneBase: {
      decorators: [UseGuards(JwtAuthGuard), ApiBearerAuth()],
    },
    createManyBase: {
      decorators: [UseGuards(JwtAuthGuard), ApiBearerAuth()],
    },
    updateOneBase: {
      decorators: [UseGuards(JwtAuthGuard, ContentOwnerGuard), ApiBearerAuth()],
    },
    replaceOneBase: {
      decorators: [UseGuards(JwtAuthGuard, ContentOwnerGuard), ApiBearerAuth()],
    },
    deleteOneBase: {
      decorators: [UseGuards(JwtAuthGuard, ContentOwnerGuard), ApiBearerAuth()],
    },
  },
})
@CrudAuth({
  property: 'user',
  persist: (user: UserDTO) => ({
    userId: user?.id,
  }),
})
@ApiTags('Content')
@Controller('contents')
export class ContentController implements CrudController<ContentDTO> {
  constructor(public service: ContentService) {}

  @Post('url')
  async getPersistentUrl(@Body() dto: CreateFileDTO) {
    return this.service.saveFileInCloud(dto);
  }
}
