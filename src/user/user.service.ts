import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UpdateContentDTO } from 'src/content/dto/update-content.dto';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { UsersRepository } from './user.repository';
import { User } from './users.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<UserDTO> {
  constructor(public repo: UsersRepository, @Inject(REQUEST) private req) {
    super(repo);
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    const user = await this.repo.findOne({ where: { email } });
    return user;
  }

  async registrateOne(dto: CreateUserDTO): Promise<UserDTO> {
    const newUser: UserDTO = await this.repo.create(dto);
    return this.repo.save(newUser);
  }

  async updateOneUser(dto: UpdateUserDTO, id: number) {
    const user: UserDTO = await this.repo.findOneOrFail(id);
    const newUser = await this.repo.create({ ...user, ...dto });
    return await this.repo.save(newUser);
  }
}
