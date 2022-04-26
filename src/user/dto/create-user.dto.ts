import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { UserDTO } from './user.dto';

export class CreateUserDTO extends PickType(UserDTO, ['email'] as const) {
  @ApiProperty({ example: '123Adwr.', description: 'Пароль' })
  @IsString()
  password: string;
}
