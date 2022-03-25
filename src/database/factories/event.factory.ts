import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Event } from 'src/event/event.entity';

define(Event, (faker: typeof Faker) => {
  const event = new Event();
  const name = faker.lorem.word();
  event.name = name;
  return event;
});
