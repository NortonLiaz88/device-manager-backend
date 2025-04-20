import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Category } from './database/entities/category';
import { Device } from './database/entities/device';
import { AppService } from './app.service';
import { typeOrmConfig } from './database/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    TypeOrmModule.forFeature([Category, Device]),
  ],
  providers: [AppService],
})
export class AppModule {}
