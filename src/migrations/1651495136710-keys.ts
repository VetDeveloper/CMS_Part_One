import {MigrationInterface, QueryRunner} from "typeorm";

export class keys1651495136710 implements MigrationInterface {
    name = 'keys1651495136710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content" RENAME COLUMN "link" TO "keys"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content" RENAME COLUMN "keys" TO "link"`);
    }

}
