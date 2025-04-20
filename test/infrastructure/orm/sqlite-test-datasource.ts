// src/__tests__/orm/sqlite-test-datasource.ts

import { DataSource } from 'typeorm';
import { CategoryOrmEntity } from 'src/infrastructure/database/entities/category.orm-entity';
import { DeviceOrmEntity } from 'src/infrastructure/database/entities/device.orm-entity';

export const SQLiteTestDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [CategoryOrmEntity, DeviceOrmEntity],
  synchronize: true,
  dropSchema: true,
  logging: false,
});
