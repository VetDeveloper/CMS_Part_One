import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/users.entity';
import * as bcrypt from 'bcryptjs';

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

  async login(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registration(userDto: CreateUserDTO) {
    const isUserAlreadyExist = await this.userService.getUserByEmail(
      userDto.email,
    );

    if (isUserAlreadyExist) {
      throw new BadRequestException(
        'Пользователь с таким email УЖЕ существует',
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.registrateOne({
      ...userDto,
      password: hashPassword,
    });

    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
