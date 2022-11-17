import { CustomNamingStrategy } from './lib/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

const datasourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST ?? 'db',
  port: Number(process.env.DB_PORT ?? '3306'),
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_NAME ?? 'github_lens',
  synchronize: false,
  logging: process.env.ENV === 'local',
  entities: ['src/infrastructure/datasources/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  namingStrategy: new CustomNamingStrategy(),
};

export const ormoptions: TypeOrmModuleOptions = {
  ...datasourceOptions,
  entities: [join(__dirname, '/infrastructure/datasources/*.js')],
  migrations: ['src/migrations/**/*.js'],
};

const source = new DataSource(datasourceOptions);
void source.initialize();

export default source;
