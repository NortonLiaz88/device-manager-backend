import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { CategorySeeder } from '../seed/category.seed';
import { DeviceSeeder } from '../seed/device.seed';
import { CategoryOrmEntity } from '../entities/category.orm-entity';
import { DeviceOrmEntity } from '../entities/device.orm-entity';

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [CategoryOrmEntity, DeviceOrmEntity],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: true,
    logging: true,
    ssl: {
      rejectUnauthorized: false,
    },
    seeds: [CategorySeeder, DeviceSeeder],
    factories: ['./*.factory.ts'],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource);
})();
