import {MigrationInterface, QueryRunner} from "typeorm";

export class googleAuthPass1651670872204 implements MigrationInterface {
    name = 'googleAuthPass1651670872204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }

}