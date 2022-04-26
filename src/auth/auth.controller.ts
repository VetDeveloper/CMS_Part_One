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
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthResponse } from './dto/response-auth.dto';

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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return await this.authService.googleLogin(req.user);
  }
}
