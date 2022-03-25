import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Screen } from 'src/screen/screen.entity';

define(Screen, (faker: typeof Faker) => {
  const screen = new Screen();
  return screen;
});
