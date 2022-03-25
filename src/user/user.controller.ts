import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './users.entity';

@Crud({
  model: {
    type: User,
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

  get base(): CrudController<User> {
    return this;
  }

  @Override()
  async getOne(@ParsedRequest() req: CrudRequest) {
    const user: User = await this.base.getOneBase(req);
    const { password, ...result } = user;
    return result;
  }
}
