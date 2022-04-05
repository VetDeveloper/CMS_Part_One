import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CrudRequest, ParsedRequest } from '@nestjsx/crud';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/users.entity';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Logon and Login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'Успешная авторизация',
    type: typeof { token: 'eyJh' },
  })
  @ApiUnauthorizedResponse({ description: 'Неправильный email или пароль' })
  @ApiOperation({ summary: 'Авторизация' })
  @ApiBody({ type: LoginUserDTO })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBadRequestResponse({
    description: 'Пользователь с таким email уже существует',
  })
  @ApiOperation({ summary: 'Регистрация' })
  @ApiResponse({ status: 201, type: typeof { token: 'eyJh' } })
  @Post('reg')
  async reg(@Body() userDto: CreateUserDTO, @ParsedRequest() req: CrudRequest) {
    return this.authService.registration(userDto);
  }
}
