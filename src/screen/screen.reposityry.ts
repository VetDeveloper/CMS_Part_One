import { EntityRepository, Repository } from 'typeorm';
import { Screen } from './screen.entity';

@EntityRepository(Screen)
export class ScreenReposityry extends Repository<Screen> {}
