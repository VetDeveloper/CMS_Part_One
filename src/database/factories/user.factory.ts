import { User } from 'src/user/users.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

define(User, (faker: typeof Faker) => {
  const user = new User();
  const email = faker.internet.email();
  const password = 'seedPassword';
  user.email = email;
  user.password = password;
  return user;
});
