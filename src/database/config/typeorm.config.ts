// src/database/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Category } from '../entities/category';
import { Device } from '../entities/device';

export const typeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get('DB_HOST'),
  port: Number(config.get('DB_PORT')),
  username: config.get('DB_USERNAME'),
  password: config.get('DB_PASSWORD'),
  database: config.get('DB_NAME'),
  entities: [Category, Device],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  logging: true,
});
