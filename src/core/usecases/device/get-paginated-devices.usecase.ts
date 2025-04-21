import { DeviceEntity } from 'src/core/domain/entities/device.entity';
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
    data: DeviceEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.repo.paginate(input);
  }
}
