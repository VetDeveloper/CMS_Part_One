import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './users.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<UserDTO> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    const user = await this.repo.findOne({ where: { email } });
    return user;
  }

  async registrateOne(dto: CreateUserDTO): Promise<UserDTO> {
    return this.repo.save(dto);
  }
}
