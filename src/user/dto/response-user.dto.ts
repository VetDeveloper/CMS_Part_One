import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { User } from '../users.entity';
import { UserModel } from './user.dto';

export class ResponseUserDTO extends PickType(UserModel, [
  'id',
  'email',
  'createdAt',
  'updatedAt',
]) {}
