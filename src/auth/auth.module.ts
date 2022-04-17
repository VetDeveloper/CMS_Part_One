import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot({
      envFilePath: 'test.env',
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '48h',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
