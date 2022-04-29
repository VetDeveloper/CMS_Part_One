import {MigrationInterface, QueryRunner} from "typeorm";

export class refreshToken1651257288729 implements MigrationInterface {
    name = 'refreshToken1651257288729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "currentHashedRefreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "currentHashedRefreshToken"`);
    }

}
