// src/application/module/device.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/core/domain/repositories/category.repository';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';
import { CreateDeviceUseCase } from 'src/core/usecases/device/create-device.usecase';
import { DeleteDeviceUseCase } from 'src/core/usecases/device/delete-device.usecase';
import { GetAllDevicesUseCase } from 'src/core/usecases/device/get-all-devices.usecase';
import { GetDeviceByIdUseCase } from 'src/core/usecases/device/get-device-by-id.usecase';
import { GetPaginatedDevicesUseCase } from 'src/core/usecases/device/get-paginated-devices.usecase';
import { UpdateDeviceUseCase } from 'src/core/usecases/device/update-device.usecase';
import { DeviceOrmEntity } from 'src/infrastructure/database/orm/entities/device.orm-entity';
import { DeviceTypeOrmRepository } from 'src/infrastructure/database/repositories/device.typeorm.repository';
import { DeviceController } from 'src/presentation/http/controllers/device.controller';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceOrmEntity]), CategoryModule],
  controllers: [DeviceController],
  providers: [
    {
      provide: 'DeviceRepository',
      useClass: DeviceTypeOrmRepository,
    },
    {
      provide: CreateDeviceUseCase,
      useFactory: (
        deviceRepo: DeviceRepository,
        categoryRepo: CategoryRepository,
      ) => new CreateDeviceUseCase(deviceRepo, categoryRepo),
      inject: ['DeviceRepository', 'CategoryRepository'],
    },
    {
      provide: UpdateDeviceUseCase,
      useFactory: (
        deviceRepo: DeviceRepository,
        categoryRepo: CategoryRepository,
      ) => new UpdateDeviceUseCase(deviceRepo, categoryRepo),
      inject: ['DeviceRepository', 'CategoryRepository'],
    },
    {
      provide: GetAllDevicesUseCase,
      useFactory: (repo: DeviceRepository) => new GetAllDevicesUseCase(repo),
      inject: ['DeviceRepository'],
    },
    {
      provide: GetDeviceByIdUseCase,
      useFactory: (repo: DeviceRepository) => new GetDeviceByIdUseCase(repo),
      inject: ['DeviceRepository'],
    },
    {
      provide: DeleteDeviceUseCase,
      useFactory: (repo: DeviceRepository) => new DeleteDeviceUseCase(repo),
      inject: ['DeviceRepository'],
    },
    {
      provide: GetPaginatedDevicesUseCase,
      useFactory: (repo: DeviceRepository) =>
        new GetPaginatedDevicesUseCase(repo),
      inject: ['DeviceRepository'],
    },
  ],
})
export class DeviceModule {}
