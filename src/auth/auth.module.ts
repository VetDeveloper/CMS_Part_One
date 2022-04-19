import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';
import * as Joi from 'joi';

@Module({
  imports: [
    UserModule,
    PassportModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   //envFilePath: 'test.env',
    //   validationSchema: Joi.object({
    //     SECRET_KEY: Joi.string().default('SECRETKEY'),
    //   }),
    // }),
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
