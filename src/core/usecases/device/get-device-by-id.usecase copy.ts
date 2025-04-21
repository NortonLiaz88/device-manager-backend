import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';

export class GetDeviceByPartNumberUseCase {
  constructor(private readonly repo: DeviceRepository) {}

  async execute(partNumber: number): Promise<DeviceEntity | null> {
    return this.repo.findById(partNumber);
  }
}
