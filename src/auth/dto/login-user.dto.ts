import { PickType } from '@nestjs/swagger';
import { CreateUserDTO } from '../../user/dto/create-user.dto';

export class LoginUserDTO extends PickType(CreateUserDTO, [
  'email',
  'password',
] as const) {}
