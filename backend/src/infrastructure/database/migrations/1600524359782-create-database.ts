import { MigrationInterface, QueryRunner } from "typeorm"
/**
 * ts-node ./node_modules/typeorm/cli.js migration:run
 * ts-node ./node_modules/typeorm/cli.js migration:revert
 */
export class createDatabase1600524359782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "administration" AUTHORIZATION "sa_sonia"`);
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "registration" AUTHORIZATION "sa_sonia"`);

        await queryRunner.query(`CREATE TYPE registration.product_type_enum AS ENUM ('PRODUCT', 'SERVICE');`);        
        await queryRunner.query(`CREATE TYPE administration.permission AS ENUM ('ADMINISTRATOR', 'USER');`);        
    }       
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP SCHEMA IF EXISTS "administration" CASCADE`);
        await queryRunner.query(`DROP SCHEMA IF EXISTS "registration" CASCADE`);
    }
}