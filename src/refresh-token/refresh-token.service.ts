import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RefreshToken } from './refresh-token.entity';
import { RefreshTokenReposityry } from './refresh-token.repository';

@Injectable()
export class RefreshTokenService extends TypeOrmCrudService<RefreshToken> {
  constructor(public repo: RefreshTokenReposityry) {
    super(repo);
  }

  async updateRefreshToken(id: number, dto) {
    return this.repo.update(id, dto);
  }

  async saveRefreshToken(dto) {
    return this.repo.save(dto);
  }
}
