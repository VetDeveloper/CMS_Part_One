import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { ResponseUserDTO } from 'src/user/dto/response-user.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export class AuthResponse {
  constructor(user: UserDTO, access_token: string) {
    const { password, ...result } = user;
    this.user = result;
    this.access_token = access_token;
  }

  static create(dto): AuthResponse {
    return new AuthResponse(dto.user, dto.access_token);
  }

  @ApiProperty()
  user: ResponseUserDTO;
  @ApiProperty()
  access_token: string;
}
