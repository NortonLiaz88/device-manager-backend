import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { CategoryRepository } from 'src/core/domain/repositories/category.repository';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';

interface CreateDeviceInput {
  categoryId: number;
  color: string;
  partNumber: number;
}

export class CreateDeviceUseCase {
  constructor(
    private readonly deviceRepo: DeviceRepository,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  async execute(input: CreateDeviceInput): Promise<DeviceEntity> {
    const category = await this.categoryRepo.findById(input.categoryId);

    if (!category) {
      throw new Error(`Category with id ${input.categoryId} does not exist`);
    }

    const existingDevice = await this.deviceRepo.findByPartNumber(
      input.partNumber,
    );

    if (existingDevice) {
      throw new Error(
        `Device with part number ${input.partNumber} already exists`,
      );
    }

    const device = new DeviceEntity(
      0,
      input.categoryId,
      input.color,
      input.partNumber,
    );
    return this.deviceRepo.create(device, category);
  }
}
