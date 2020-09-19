import { MigrationInterface, QueryRunner } from "typeorm"
/**
 * ts-node ./node_modules/typeorm/cli.js migration:run
 * ts-node ./node_modules/typeorm/cli.js migration:revert
 */
export class createDatabase1600524359782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "administration" AUTHORIZATION "sa_sonia"`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP SCHEMA IF EXISTS "administration"`);
    }

}