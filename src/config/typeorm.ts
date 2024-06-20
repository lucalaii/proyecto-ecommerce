import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST } from './envs';

const config = {
  type: 'postgres',
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT as unknown as number,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  logging: false,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
  // dropSchema: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
