import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController, Override } from '@nestjsx/crud';
import { ContentOwnerGuard } from 'src/auth/guards/contentOwner.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/users.entity';
import { Content } from './content.entity';
import { ContentService } from './content.service';
import { CreateContentDTO } from './dto/create-content.dto';
import { UpdateContentDTO } from './dto/update-content.dto';

@Crud({
  model: {
    type: Content,
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
  persist: (user: User) => ({
    userId: user?.id,
  }),
})
@ApiTags('Content')
@Controller('contents')
export class ContentController implements CrudController<Content> {
  constructor(public service: ContentService) {}

  // @UseGuards(JwtAuthGuard, ContentOwnerGuard)
  // @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @Post('/:id/files')
  async createOneFile(
    @Param('id') contentId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.createOneFile(
      contentId,
      file.buffer,
      file.originalname,
    );
  }

  // @UseGuards(JwtAuthGuard, ContentOwnerGuard)
  // @ApiBearerAuth()
  @Delete('/:id/files')
  async deleteOneFile(
    @Param('id') contentId: number,
    @Body() dto: { fileName: string },
  ) {
    return this.service.deleteOneFile(contentId, dto.fileName);
  }
}
