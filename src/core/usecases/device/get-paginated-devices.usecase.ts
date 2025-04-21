import { DeviceWithCategoryEntity } from 'src/core/domain/entities/device-with-category';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';

interface GetPaginatedDevicesInput {
  page: number;
  limit: number;
  id?: number;
  color?: string;
  partNumber?: number;
  orderBy: 'id' | 'color' | 'partNumber';
  orderDir: 'ASC' | 'DESC';
}

export class GetPaginatedDevicesUseCase {
  constructor(private readonly repo: DeviceRepository) {}

  async execute(input: GetPaginatedDevicesInput): Promise<{
    data: DeviceWithCategoryEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.repo.paginate(input);
  }
}
