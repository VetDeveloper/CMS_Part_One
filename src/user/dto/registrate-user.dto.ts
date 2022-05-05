import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserModel } from './user.dto';

export class RegistrateUserDTO extends PickType(UserModel, [
  'email',
  'password',
] as const) {}
