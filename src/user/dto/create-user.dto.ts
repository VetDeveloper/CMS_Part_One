import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { UserModel } from './user.dto';

export class CreateUserDTO extends PickType(UserModel, ['email'] as const) {
  @ApiProperty({ example: '123Adwr.', description: 'Пароль' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'RedmiNote 8 Pro', description: 'Девайс' })
  @IsString()
  device: string;
}
