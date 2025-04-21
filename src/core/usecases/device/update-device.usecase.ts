import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { CategoryRepository } from 'src/core/domain/repositories/category.repository';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';

interface UpdateDeviceInput {
  id: number;
  categoryId: number;
  color: string;
  partNumber: number;
}

export class UpdateDeviceUseCase {
  constructor(
    private readonly deviceRepo: DeviceRepository,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async execute(input: UpdateDeviceInput): Promise<DeviceEntity> {
    const existingDevice = await this.deviceRepo.findById(input.id);
    if (!existingDevice) {
      throw new Error(`Device with id ${input.id} not found`);
    }

    const category = await this.categoryRepo.findById(input.categoryId);
    if (!category) {
      throw new Error(`Category with id ${input.categoryId} not found`);
    }

    const updatedDevice = new DeviceEntity(
      input.id,
      input.categoryId,
      input.color,
      input.partNumber,
    );

    return this.deviceRepo.update(updatedDevice, category);
  }
}
