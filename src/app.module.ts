import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryOrmEntity } from './infrastructure/database/entities/category.orm-entity';
import { AppService } from './app.service';
import { typeOrmConfig } from './database/config/typeorm.config';
import { CategoryModule } from './modules/category/category.module';
import { DeviceOrmEntity } from './infrastructure/database/entities/device.orm-entity';

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
  ],
  providers: [AppService],
})
export class AppModule {}
