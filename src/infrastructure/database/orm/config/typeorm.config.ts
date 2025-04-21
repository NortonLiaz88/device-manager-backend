import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DeviceOrmEntity } from 'src/infrastructure/database/orm/entities/device.orm-entity';
import { CategoryOrmEntity } from 'src/infrastructure/database/orm/entities/category.orm-entity';

export const typeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => {
  const dbType = (config.get('DB') ?? 'mysql') as
    | 'mysql'
    | 'postgres'
    | 'mariadb'
    | 'cockroachdb'
    | 'aurora-mysql';

  return {
    type: dbType,
    host: config.get<string>('DB_HOST'),
    port: Number(config.get<number>('DB_PORT')),
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),
    entities: [CategoryOrmEntity, DeviceOrmEntity],
    ssl: dbType === 'mysql' ? { rejectUnauthorized: false } : undefined,
    synchronize: false,
    logging: true,
  } as TypeOrmModuleOptions; // 👈 força cast seguro
};
