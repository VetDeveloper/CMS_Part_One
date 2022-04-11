import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserOwnerGuard } from 'src/auth/guards/userOwner.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { ResponseUserDTO } from './dto/response-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './users.entity';

@Crud({
  model: {
    type: UserDTO,
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
  persist: (user: UserDTO) => ({
    userId: user?.id,
  }),
})
@ApiTags('Users')
@Controller('users')
export class UserController implements CrudController<UserDTO> {
  constructor(public service: UserService) {}
}
