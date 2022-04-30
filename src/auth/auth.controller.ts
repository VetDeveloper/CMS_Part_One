import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Req,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOAuth2,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from 'src/commons/decorators/get-user';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { RefreshDTO } from './dto/refresh.dto';
import { AuthResponse } from './dto/response-auth.dto';
import { JwtAuthGuard } from './guards/jwt.auth.guard';

@ApiTags('Logon and Login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'Успешная авторизация',
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Неправильный email или пароль' })
  @ApiOperation({ summary: 'Авторизация' })
  @ApiBody({ type: LoginUserDTO })
  @Post('login')
  async login(@Body() user: LoginUserDTO) {
    const answ = AuthResponse.create(await this.authService.login(user));
    return answ;
  }

  @ApiBadRequestResponse({
    description: 'Пользователь с таким email уже существует',
  })
  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({
    status: 201,
    type: AuthResponse,
  })
  @Post('reg')
  async reg(@Body() userDto: CreateUserDTO) {
    const answ = AuthResponse.create(
      await this.authService.registration(userDto),
    );
    return answ;
  }

  @ApiOperation({ summary: 'Endpoint для входа в приложение через Google' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @ApiOperation({ summary: 'Endpoint redirect Google' })
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@GetUser() user) {
    const answ = AuthResponse.create(await this.authService.googleLogin(user));
    return answ;
  }

  @ApiOperation({ summary: 'Получить access token по refresh token' })
  @ApiResponse({ status: 201, type: AuthResponse })
  @ApiBody({ type: RefreshDTO })
  @Post('refresh')
  async refresh(@Body() refreshToken: RefreshDTO) {
    const answ = AuthResponse.create(
      await this.authService.getAccessTokenByRefreshToken(refreshToken.refresh_token)
    );
    return answ;
  }
}
