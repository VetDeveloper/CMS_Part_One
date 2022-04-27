import {
  BadRequestException,
  ForbiddenException,
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
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user || !pass) {
      throw new UnauthorizedException('Неправильный логин или пароль');
    }

    const passwordEquals = await bcrypt.compare(pass, user.password);

    if (passwordEquals) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Неправильный логин или пароль');
  }

  private getTokenObject(user: UserDTO) {
    const payload = { email: user.email, id: user.id };
    const { password, ...res } = user;
    return {
      user: { ...res },
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(dto: LoginUserDTO) {
    const user: UserDTO = await this.validateUser(dto.email, dto.password);
    return this.getTokenObject(user);
  }

  async registration(userDto: CreateUserDTO) {
    const isUserAlreadyExist = await this.usersService.getUserByEmail(
      userDto.email,
    );

    if (isUserAlreadyExist) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }

    const user = await this.usersService.registrateOne(userDto);
    return this.getTokenObject(user);
  }

  async googleLogin(dto) {
    let user: UserDTO = await this.usersService.getUserByEmail(dto.email);

    if (user) {
      return this.getTokenObject(user);
    }

    user = await this.usersService.registrateOne({ email: dto.email });
    return this.getTokenObject(user);
  }
}
