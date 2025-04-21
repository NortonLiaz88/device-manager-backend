import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';

export class GetAllDevicesUseCase {
  constructor(private readonly repo: DeviceRepository) {}

  async execute(): Promise<DeviceEntity[]> {
    return this.repo.findAll();
  }
}
