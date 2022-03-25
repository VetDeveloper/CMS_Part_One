import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.repo.findOne({ where: { email } });
    return user;
  }

  async registrateOne(dto: CreateUserDTO): Promise<User> {
    return this.repo.save(dto);
  }
}
