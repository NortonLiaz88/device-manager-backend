import { CategoryEntity } from '../entities/category.entity';
import { DeviceWithCategoryEntity } from '../entities/device-with-category';
import { DeviceEntity } from '../entities/device.entity';

export interface DeviceRepository {
  create(device: DeviceEntity, category: CategoryEntity): Promise<DeviceEntity>;
  update(device: DeviceEntity, category: CategoryEntity): Promise<DeviceEntity>;
  findAll(): Promise<DeviceEntity[]>;
  findById(id: number): Promise<DeviceEntity | null>;
  findByPartNumber(partNumber: number): Promise<DeviceEntity | null>;
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
    data: DeviceWithCategoryEntity[];
    total: number;
    page: number;
    limit: number;
  }>;
}
