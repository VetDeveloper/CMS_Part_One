import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/users.entity';
import * as bcrypt from 'bcryptjs';
import { UserDTO } from 'src/user/dto/user.dto';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const passwordEquals = await bcrypt.compare(pass, user.password);

    if (passwordEquals) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(dto: LoginUserDTO) {
    const user: UserDTO = await this.userService.getUserByEmail(dto.email);
    const payload = { id: user.id, email: user.email };
    return {
      user: { ...user },
      access_token: this.jwtService.sign(payload),
    };
  }

  async registration(userDto: CreateUserDTO) {
    const user = await this.userService.registrateOne(userDto);
    const payload = { email: user.email, id: user.id };
    return {
      user: { ...user },
      access_token: this.jwtService.sign(payload),
    };
  }
}
