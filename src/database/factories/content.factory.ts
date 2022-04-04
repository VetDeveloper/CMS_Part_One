import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Content } from 'src/content/content.entity';

define(Content, (faker: typeof Faker) => {
  const content = new Content();

  const name = faker.lorem.word();
  const link = [
    faker.internet.url(),
    faker.internet.url(),
    faker.internet.url(),
  ];

  content.name = name;
  content.link = link;

  return content;
});
