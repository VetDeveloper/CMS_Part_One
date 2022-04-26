import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/users.entity';
import { EventModule } from './event/event.module';
import { Event as Eventt } from './event/event.entity';
import { ScreenModule } from './screen/screen.module';
import { Screen } from './screen/screen.entity';
import { AuthModule } from './auth/auth.module';
import { PlaylistModule } from './playlist/playlist.module';
import { PlaylistContentModule } from './playlist-content/playlist-content.module';
import { ContentModule } from './content/content.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SECRET_KEY: Joi.string().default('SECRETKEY'),
        DB_PORT: Joi.number().default(5432),
        DB_HOST: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DATABASE: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().default(true),
        GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: configService.get('DB_PORT'),
        host: configService.get('DB_HOST'),
        password: configService.get('DB_PASSWORD'),
        username: configService.get('DB_USERNAME'),
        entities: ['dist/**/*.entity.js'],
        database: configService.get('DATABASE'),
        factories: ['dist/**/database/factories/**/*.js'],
        synchronize: configService.get('DB_SYNCHRONIZE'),
        seeds: ['dist/**/database/seeds/**/*.js'],
      }),
    }),
    UserModule,
    EventModule,
    ScreenModule,
    AuthModule,
    PlaylistModule,
    PlaylistContentModule,
    ContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
