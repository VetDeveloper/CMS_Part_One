import { MigrationInterface, QueryRunner } from 'typeorm';

export class HeightWidth1651746414954 implements MigrationInterface {
  name = 'HeightWidth1651746414954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file_object" DROP COLUMN "resolution"`,
    );
    await queryRunner.query(`ALTER TABLE "file_object" ADD "width" integer`);
    await queryRunner.query(`ALTER TABLE "file_object" ADD "height" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "file_object" DROP COLUMN "height"`);
    await queryRunner.query(`ALTER TABLE "file_object" DROP COLUMN "width"`);
    await queryRunner.query(
      `ALTER TABLE "file_object" ADD "resolution" integer`,
    );
  }
}
