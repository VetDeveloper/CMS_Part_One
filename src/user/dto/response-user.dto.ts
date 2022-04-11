import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { User } from '../users.entity';
import { UserDTO } from './user.dto';

export class ResponseUserDTO extends PickType(UserDTO, [
  'email',
  'created_at',
  'updated_at',
]) {}
