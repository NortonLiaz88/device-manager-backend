import { CategoryEntity } from '../entities/category.entity';
import { DeviceEntity } from '../entities/device.entity';

export interface DeviceRepository {
  create(device: DeviceEntity, category: CategoryEntity): Promise<DeviceEntity>;
  update(device: DeviceEntity, category: CategoryEntity): Promise<DeviceEntity>;
  findAll(): Promise<DeviceEntity[]>;
  findById(id: number): Promise<DeviceEntity | null>;
  delete(id: number): Promise<void>;
  paginate(query: {
    page: number;
    limit: number;
    id?: number;
    color?: string;
    partNumber?: number;
    orderBy: 'id' | 'color' | 'partNumber';
    orderDir: 'ASC' | 'DESC';
  }): Promise<{
    data: DeviceEntity[];
    total: number;
    page: number;
    limit: number;
  }>;
}
