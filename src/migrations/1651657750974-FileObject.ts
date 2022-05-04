import {MigrationInterface, QueryRunner} from "typeorm";

export class FileObject1651657750974 implements MigrationInterface {
    name = 'FileObject1651657750974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file_object" ("id" SERIAL NOT NULL, "contentId" integer NOT NULL, "key" character varying NOT NULL, "orientation" character varying, "resolution" integer, CONSTRAINT "UQ_ed6af37143cf602bd9faade8111" UNIQUE ("key"), CONSTRAINT "PK_1994186c0a6bafbb6ccc8bc1853" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "keys"`);
        await queryRunner.query(`ALTER TABLE "file_object" ADD CONSTRAINT "FK_eccda098b4f3e811d0ea4dc9bea" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file_object" DROP CONSTRAINT "FK_eccda098b4f3e811d0ea4dc9bea"`);
        await queryRunner.query(`ALTER TABLE "content" ADD "keys" character varying array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`DROP TABLE "file_object"`);
    }

}
