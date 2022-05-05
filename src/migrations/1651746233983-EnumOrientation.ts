import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnumOrientation1651746233983 implements MigrationInterface {
  name = 'EnumOrientation1651746233983';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file_object" DROP COLUMN "orientation"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."file_object_orientation_enum" AS ENUM('portrait', 'landscape')`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_object" ADD "orientation" "public"."file_object_orientation_enum"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file_object" DROP COLUMN "orientation"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."file_object_orientation_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file_object" ADD "orientation" character varying`,
    );
  }
}
