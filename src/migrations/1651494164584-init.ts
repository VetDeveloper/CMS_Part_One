import {MigrationInterface, QueryRunner} from "typeorm";

export class init1651494164584 implements MigrationInterface {
    name = 'init1651494164584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "playlist_content" ("id" SERIAL NOT NULL, "playlistId" integer NOT NULL, "contentId" integer NOT NULL, "userId" integer NOT NULL, "ordinalNumber" integer NOT NULL, "duration" double precision NOT NULL, CONSTRAINT "UQ_ae60dc8225ba46673866e9dd86b" UNIQUE ("playlistId", "ordinalNumber"), CONSTRAINT "PK_b92302a5c24f36383de1a5b96d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist" ("id" SERIAL NOT NULL, "screenId" integer NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_a0c36ea4482e5015ac6f1749ad" UNIQUE ("screenId"), CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "screen" ("id" SERIAL NOT NULL, "eventId" integer NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d30806a7556636b84d24e75f4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "name" character varying(40) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(35) NOT NULL, "password" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "currentHashedRefreshToken" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "content" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "name" character varying(40) NOT NULL, "link" character varying array NOT NULL DEFAULT '{}', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "playlist_content" ADD CONSTRAINT "FK_51b56d109200832ffe3b0d30cba" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_content" ADD CONSTRAINT "FK_8b1856cc3bdcc0eeeab150daa59" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_content" ADD CONSTRAINT "FK_7800b81d78dc785e558ec31f1fe" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_a0c36ea4482e5015ac6f1749ad5" FOREIGN KEY ("screenId") REFERENCES "screen"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screen" ADD CONSTRAINT "FK_245de35b79e1d136adee5b1f493" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screen" ADD CONSTRAINT "FK_dda5d2273aa0068aa0eb8a22f7f" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_43185da5e33e99752c6edf91352" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_43185da5e33e99752c6edf91352"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`);
        await queryRunner.query(`ALTER TABLE "screen" DROP CONSTRAINT "FK_dda5d2273aa0068aa0eb8a22f7f"`);
        await queryRunner.query(`ALTER TABLE "screen" DROP CONSTRAINT "FK_245de35b79e1d136adee5b1f493"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_a0c36ea4482e5015ac6f1749ad5"`);
        await queryRunner.query(`ALTER TABLE "playlist_content" DROP CONSTRAINT "FK_7800b81d78dc785e558ec31f1fe"`);
        await queryRunner.query(`ALTER TABLE "playlist_content" DROP CONSTRAINT "FK_8b1856cc3bdcc0eeeab150daa59"`);
        await queryRunner.query(`ALTER TABLE "playlist_content" DROP CONSTRAINT "FK_51b56d109200832ffe3b0d30cba"`);
        await queryRunner.query(`DROP TABLE "content"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "screen"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
        await queryRunner.query(`DROP TABLE "playlist_content"`);
    }

}
