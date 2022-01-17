import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { Job } from './entities/Job';

const logger = new Logger('MikroORM');
const config = {
  entities: [Job],
  host: process.env.POSTGRES_HOST,
  dbName: 'postgres',
  type: 'postgresql',
  debug: true,
  logger: logger.log.bind(logger),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: './migrations', // path to the folder with migrations
    pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    emit: 'ts', // migration generation mode
  },
} as Options;

export default config;
