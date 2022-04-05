import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserOwnerGuard } from 'src/auth/guards/userOwner.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { ResponseUserDTO } from './dto/response-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './users.entity';

@Crud({
  model: {
    type: User,
  },
  routes: {
    exclude: ['createManyBase', 'createOneBase'],
    getOneBase: {
      decorators: [ApiResponse({ status: 200, type: ResponseUserDTO })],
    },
    getManyBase: {
      decorators: [ApiResponse({ status: 200, type: [ResponseUserDTO] })],
    },
    updateOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, UserOwnerGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: ResponseUserDTO }),
      ],
    },
    replaceOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, UserOwnerGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: ResponseUserDTO }),
      ],
    },
    deleteOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, UserOwnerGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: ResponseUserDTO }),
      ],
    },
  },
  dto: {
    create: CreateUserDTO,
    update: UpdateUserDTO,
    replace: CreateUserDTO,
  },
})
@CrudAuth({
  property: 'user',
  persist: (user: User) => ({
    userId: user?.id,
  }),
})
@ApiTags('Users')
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
