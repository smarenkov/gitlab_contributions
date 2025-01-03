import { DataSource, DataSourceOptions } from 'typeorm';
import { cwd, env } from 'process';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

console.log('Environment Variables:');
console.log('POSTGRES_USER:', env.POSTGRES_USER);
console.log('POSTGRES_DB:', env.POSTGRES_DB);

const baseConfig = {
    type: 'postgres' as const,
    entitySkipConstructor: true,
    host: env.POSTGRES_HOST,
    port: parseInt(env.POSTGRES_PORT),
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    entities: [cwd() + '/dist/core/**/*.entity.js'],
    migrations: [cwd() + '/dist/database/migrations/*.js'],
    synchronize: false,
    dropSchema: false,
    migrationsRun: true,
    logging: false,
    maxQueryExecutionTime: 30000,
    poolSize: 5,
};

export const databaseConfig: DataSourceOptions = {
    ...baseConfig,
};

export const dataSource = new DataSource({
    ...baseConfig,
    host: 'localhost',
});
