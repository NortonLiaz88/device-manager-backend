import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1745264945775 implements MigrationInterface {
  name = 'InitDb1745264945775';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(128) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`devices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`color\` varchar(16) NOT NULL, \`part_number\` int NOT NULL, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`devices\` ADD CONSTRAINT \`FK_2893c2e4730ccce6f050a958cf1\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`devices\` DROP FOREIGN KEY \`FK_2893c2e4730ccce6f050a958cf1\``,
    );
    await queryRunner.query(`DROP TABLE \`devices\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
