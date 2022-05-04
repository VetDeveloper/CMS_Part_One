import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
import { GetPersistentUrlDTO } from './dto/get-persistent-url.dto';
import { ResponseUrlDTO } from './dto/reponse-url.dto';
import { CreateFileDTO } from './dto/create-file.dto';
import { DeleteFileDTO } from './dto/delete-file.dto';
import { FileObject } from 'src/file-object/file-object.entity';
import { ResponseFileObject } from 'src/file-object/dto/response-file-object.dto';

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
    exclude: ['deleteOneBase'],
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

  @UseGuards(JwtAuthGuard, ContentOwnerGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Удаление контента',
  })
  @ApiResponse({
    status: 200,
    description: 'Контент удален успешно',
    type: ContentDTO,
  })
  @Delete('/:id')
  async deleteContent(@Param('id') contentId: number) {
    return this.service.deleteOneContent(contentId);
  }

  @ApiResponse({
    status: 201,
    description: 'URL создан успешно',
    type: ResponseUrlDTO,
  })
  @ApiOperation({
    summary: 'Получения подписанного URL для сохранения файла в облако',
  })
  @ApiBody({ type: GetPersistentUrlDTO })
  @Post('url')
  async getPersistentUrl(@Body() dto: GetPersistentUrlDTO) {
    return this.service.getPersistentUrl(dto);
  }

  @ApiOperation({ summary: 'Добавление файла к контенту' })
  @ApiResponse({ status: 201, type: ResponseFileObject })
  @ApiBody({ type: CreateFileDTO })
  @UseGuards(JwtAuthGuard, ContentOwnerGuard)
  @ApiBearerAuth()
  @Post('/:id/files')
  async createOneFile(
    @Param('id') contentId: number,
    @Body() dto: CreateFileDTO,
  ) {
    return this.service.createOneFile(contentId, dto);
  }

  @ApiOperation({ summary: 'Удаление файла из контента' })
  @ApiResponse({ status: 201, type: ContentDTO })
  @UseGuards(JwtAuthGuard, ContentOwnerGuard)
  @ApiBearerAuth()
  @Delete('/:id/files')
  async deleteOneFile(
    @Param('id') contentId: number,
    @Body() dto: DeleteFileDTO,
  ) {
    return this.service.deleteOneFile(contentId, dto);
  }
}
