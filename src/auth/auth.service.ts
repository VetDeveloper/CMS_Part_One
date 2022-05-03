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
import { DecodedObject } from './dto/decoded-object.type';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { RefreshToken } from 'src/refresh-token/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private refreshTokenService: RefreshTokenService
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

  private async getTokenObject(user: UserDTO, device: string): Promise<AuthResponse> {
    const payload: TokenPayload = { email: user.email, id: user.id };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });

    const alreadyExist : RefreshToken = await this.refreshTokenService.findOne(
      {
        where:{
          userId: user.id,
          device: device
        }
      })

    if (alreadyExist) {
      this.refreshTokenService.updateRefreshToken(alreadyExist.id, {
        refreshToken: refreshToken
      });
    } else {
      this.refreshTokenService.saveRefreshToken({
        userId: user.id,
        device: device,
        refreshToken: refreshToken,
      });
    }

    return {
      user: user,
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
    };
  }

  async login(dto: LoginUserDTO): Promise<AuthResponse> {
    const user: UserDTO = await this.validateUser(dto.email, dto.password);
    return this.getTokenObject(user, dto.device);
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

    const user = await this.usersService.registrateOne({
      ...userDto
    });
    return this.getTokenObject(user, userDto.device);
  }

  async googleLogin(dto): Promise<AuthResponse> {
    const device: string = 'google'
    let user: UserDTO = await this.usersService.getUserByEmail(dto.email);

    if (user) {
      return this.getTokenObject(user, device);
    }

    user = await this.usersService.registrateOne({
      email: dto.email,
      password: null,
    });
    return this.getTokenObject(user, device);
  }

  async getAccessTokenByRefreshToken(
    refreshToken: string,
    device: string
  ): Promise<AuthResponse> {
    const decoded: TokenPayload & DecodedObject = jwt_decode(refreshToken);

    if (!decoded) {
      throw new BadRequestException('Неправильный refresh token');
    }

    if (Date.now() >= decoded.exp * 1000) {
      throw new BadRequestException('Истек срок действия refresh token');
    }

    const user: UserDTO = await this.usersService.getUserByEmail(decoded.email);

    const refToken: RefreshToken = await this.refreshTokenService.findOne({
      where: {
        userId: decoded.id,
        device: device,
      },
    });

    if(!refToken) {
      throw new BadRequestException()
    }

    const isRefreshTokenMatching = refreshToken === refToken.refreshToken;

    if (!isRefreshTokenMatching) {
      throw new BadRequestException('Некорректный refresh token');
    }

    return this.getTokenObject(user, device);
  }
}
