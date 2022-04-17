import { EntityRepository, Repository } from 'typeorm';
import { User } from './users.entity';

@EntityRepository(User)
export class UsersReposityry extends Repository<User> {}
