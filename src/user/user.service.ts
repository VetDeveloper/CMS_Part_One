import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RegistrateUserDTO } from './dto/registrate-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserModel } from './dto/user.dto';
import { UsersRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService extends TypeOrmCrudService<UserModel> {
  constructor(public repo: UsersRepository) {
    super(repo);
  }

  async findOrCreate(email: string): Promise<UserModel> {
    const user: UserModel = await this.getUserByEmail(email);
    if (user) {
      return user;
    }
    const newUser: UserModel = this.repo.create({ email: email });
    return this.repo.save(newUser);
  }

  async getUserByEmail(email: string): Promise<UserModel> {
    const user = this.repo.findOne({ where: { email } });
    return user;
  }

  async registrateOne(dto: RegistrateUserDTO): Promise<UserModel> {
    const newUser: UserModel = this.repo.create(dto);
    return this.repo.save(newUser);
  }

  async saveOne(dto: RegistrateUserDTO): Promise<UserModel> {
    return this.repo.save(dto);
  }

  async updateOneUser(dto: UpdateUserDTO, id: number) {
    const user: UserModel = await this.repo.findOneOrFail(id);

    const newUser = this.repo.create({
      ...user,
      ...dto,
    });
    dto.password
      ? (newUser.password = await bcrypt.hash(dto.password, 5))
      : newUser.password;
    return await this.repo.save(newUser);
  }
}
