import { MigrationInterface, QueryRunner } from 'typeorm';

export class Commit1735927788987 implements MigrationInterface {
    name = 'Commit1735927788987';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "commits" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "_version" integer NOT NULL, "hash" character varying NOT NULL, "title" character varying NOT NULL, "message" character varying NOT NULL, "committed_at" TIMESTAMP WITH TIME ZONE NOT NULL, "source" character varying NOT NULL, CONSTRAINT "PK_87adcaf9b8d0f42fee0481c0917" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "commits"`);
    }
}
