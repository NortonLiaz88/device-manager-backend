import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryOrmEntity } from './infrastructure/database/orm/entities/category.orm-entity';
import { AppService } from './app.service';
import { typeOrmConfig } from './infrastructure/database/orm/config/typeorm.config';
import { CategoryModule } from './application/modules/category/category.module';
import { DeviceOrmEntity } from './infrastructure/database/orm/entities/device.orm-entity';
import { DeviceModule } from './application/modules/device/device.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    TypeOrmModule.forFeature([CategoryOrmEntity, DeviceOrmEntity]),
    CategoryModule,
    DeviceModule,
  ],
  providers: [AppService],
})
export class AppModule {}
