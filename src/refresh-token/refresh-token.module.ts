import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RefreshTokenReposityry } from "./refresh-token.repository";
import { RefreshTokenService } from "./refresh-token.service";

@Module({
  controllers: [],
  providers: [RefreshTokenService],
  imports: [TypeOrmModule.forFeature([RefreshTokenReposityry])],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
