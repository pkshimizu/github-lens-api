import { MigrationInterface, QueryRunner } from 'typeorm';

export class auto1668643265679 implements MigrationInterface {
  name = 'auto1668643265679';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`github_login_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`avatar_url\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar_url\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`github_login_id\``,
    );
  }
}
