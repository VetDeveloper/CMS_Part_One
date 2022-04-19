import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.repository';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  exports: [UserService],
})
export class UserModule {}
