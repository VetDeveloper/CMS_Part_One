import { MigrationInterface, QueryRunner } from 'typeorm';

export class Content1648969814181 implements MigrationInterface {
  name = 'Content1648969814181';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content" ALTER COLUMN "link" drop default`,
    );
    await queryRunner.query(
      `ALTER TABLE "content" ALTER COLUMN "link" type text[] using array["link"]`,
    );
    await queryRunner.query(
      `ALTER TABLE "content" ALTER COLUMN "link" set default '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "link"`);
    await queryRunner.query(
      `ALTER TABLE "content" ADD "link" character varying NOT NULL`,
    );
  }
}
