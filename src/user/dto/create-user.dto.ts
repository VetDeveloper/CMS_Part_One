import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '123Adwr.', description: 'Пароль' })
  @IsString()
  readonly password: string;
}
