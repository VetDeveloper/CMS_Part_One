import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { ResponseUserDTO } from 'src/user/dto/response-user.dto';
import { UserDTO } from 'src/user/dto/user.dto';

export class AuthResponse {
  private constructor(user: UserDTO, access_token: string, refresh_token: string) {
    const { password, ...result } = user;
    this.user = result;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }

  static create(dto): AuthResponse {
    return new AuthResponse(dto.user, dto.access_token, dto.refresh_token);
  }

  @ApiProperty()
  refresh_token: string;
  @ApiProperty()
  user: ResponseUserDTO;
  @ApiProperty()
  access_token: string;
}
