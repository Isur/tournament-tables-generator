import {MigrationInterface, QueryRunner} from "typeorm";

export class rounds1620082790807 implements MigrationInterface {
    name = 'rounds1620082790807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rounds" ("id" SERIAL NOT NULL, "round" integer NOT NULL, "result" character varying NOT NULL, "tournamentId" uuid, "whiteId" uuid, "blackId" uuid, CONSTRAINT "UQ_2e0629178f9eeb3307040d3d923" UNIQUE ("whiteId", "blackId", "round", "tournamentId"), CONSTRAINT "PK_9d254884a20817016e2f877c7e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rounds" ADD CONSTRAINT "FK_6aa93bebc177cde1f0ce4f4908c" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rounds" ADD CONSTRAINT "FK_71dcc3fcb8fcf2c229af8f05a63" FOREIGN KEY ("whiteId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rounds" ADD CONSTRAINT "FK_b28c3d3a24785c6efd2521ffb6d" FOREIGN KEY ("blackId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rounds" DROP CONSTRAINT "FK_b28c3d3a24785c6efd2521ffb6d"`);
        await queryRunner.query(`ALTER TABLE "rounds" DROP CONSTRAINT "FK_71dcc3fcb8fcf2c229af8f05a63"`);
        await queryRunner.query(`ALTER TABLE "rounds" DROP CONSTRAINT "FK_6aa93bebc177cde1f0ce4f4908c"`);
        await queryRunner.query(`DROP TABLE "rounds"`);
    }

}
