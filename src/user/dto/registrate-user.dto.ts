import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserDTO } from './user.dto';

export class RegistrateUserDTO extends PickType(UserDTO, [
  'email',
  'password',
  'currentHashedRefreshToken'
] as const) {}
