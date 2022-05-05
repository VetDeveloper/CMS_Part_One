import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
import { UserOwnerGuard } from 'src/user/guards/user-owner.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { ResponseUserDTO } from './dto/response-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserModel } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './users.entity';

@Crud({
  model: {
    type: UserModel,
  },
  routes: {
    exclude: ['createManyBase', 'createOneBase'],
    updateOneBase: {
      decorators: [UseGuards(JwtAuthGuard, UserOwnerGuard), ApiBearerAuth()],
    },
    replaceOneBase: {
      decorators: [UseGuards(JwtAuthGuard, UserOwnerGuard), ApiBearerAuth()],
    },
    deleteOneBase: {
      decorators: [UseGuards(JwtAuthGuard, UserOwnerGuard), ApiBearerAuth()],
    },
  },
  serialize: {
    update: ResponseUserDTO,
    get: ResponseUserDTO,
    delete: ResponseUserDTO,
    create: ResponseUserDTO,
    replace: ResponseUserDTO,
  },
  dto: {
    create: CreateUserDTO,
    update: UpdateUserDTO,
    replace: CreateUserDTO,
  },
})
@CrudAuth({
  property: 'user',
  persist: (user: UserModel) => ({
    userId: user?.id,
  }),
})
@ApiTags('Users')
@Controller('users')
export class UserController implements CrudController<UserModel> {
  constructor(public service: UserService) {}

  get base(): CrudController<UserModel> {
    return this;
  }

  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiResponse({ status: 200, type: ResponseUserDTO })
  @ApiNotFoundResponse({ description: 'Not found.' })
  @UseGuards(JwtAuthGuard, UserOwnerGuard)
  @ApiBearerAuth()
  @Override('updateOneBase')
  updateOne(@Body() dto: UpdateUserDTO, @Param('id', ParseIntPipe) id: number) {
    return this.service.updateOneUser(dto, id);
  }
}
