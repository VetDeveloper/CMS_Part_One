import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../dto/token-payload.dto';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private confService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: confService.get('SECRET_KEY'),
    });
  }

  async validate(payload: any): Promise<TokenPayload> {
    return { id: payload.id, email: payload.email };
  }
}
