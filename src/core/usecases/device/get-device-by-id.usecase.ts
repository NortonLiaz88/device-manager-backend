import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';

export class GetDeviceByIdUseCase {
  constructor(private readonly repo: DeviceRepository) {}

  async execute(id: number): Promise<DeviceEntity | null> {
    return this.repo.findById(id);
  }
}
