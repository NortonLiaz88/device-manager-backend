import { DeviceRepository } from 'src/core/domain/repositories/device.repository';

export class DeleteDeviceUseCase {
  constructor(private readonly repo: DeviceRepository) {}

  async execute(id: number): Promise<void> {
    const existingDevice = await this.repo.findById(id);

    if (!existingDevice) {
      throw new Error(`Device with id ${id} not found`);
    }
    await this.repo.delete(id);
  }
}
