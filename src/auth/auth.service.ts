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
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './dto/token-payload.dto';
import jwt_decode from 'jwt-decode';
import { AuthResponse } from './dto/response-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
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

  private async getTokenObject(user: UserDTO): Promise<AuthResponse> {
    const payload: TokenPayload = { email: user.email, id: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });

    this.usersService.saveOne({
      ...user,
      currentHashedRefreshToken: refreshToken,
    });

    return {
      user: user,
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
    };
  }

  async login(dto: LoginUserDTO): Promise<AuthResponse> {
    const user: UserDTO = await this.validateUser(dto.email, dto.password);
    return this.getTokenObject(user);
  }

  async registration(userDto: CreateUserDTO): Promise<AuthResponse> {
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

  async googleLogin(dto): Promise<AuthResponse> {
    let user: UserDTO = await this.usersService.getUserByEmail(dto.email);

    if (user) {
      return this.getTokenObject(user);
    }

    user = await this.usersService.registrateOne({ email: dto.email });
    return this.getTokenObject(user);
  }

  async getAccessTokenByRefreshToken(
    refreshToken: string,
  ): Promise<AuthResponse> {
    const decoded: TokenPayload = jwt_decode(refreshToken);

    if (!decoded) {
      throw new BadRequestException('Неправильный refresh token');
    }

    const user: UserDTO = await this.usersService.getUserByEmail(decoded.email);

    const isRefreshTokenMatching =
      refreshToken === user.currentHashedRefreshToken;

    if (!isRefreshTokenMatching) {
      throw new BadRequestException('Некорректный refresh token');
    }

    return await this.getTokenObject(user);
  }
}
