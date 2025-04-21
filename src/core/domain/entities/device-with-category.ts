import { CategoryEntity } from './category.entity';
import { DeviceEntity } from './device.entity';

export class DeviceWithCategoryEntity extends DeviceEntity {
  public readonly category: CategoryEntity;

  constructor(
    id: number,
    category: CategoryEntity,
    color: string,
    partNumber: number,
  ) {
    // Passa category.id apenas internamente pro DeviceEntity
    super(id, category.id, color, partNumber);
    this.category = category;
  }

  // Sobrescreve o categoryId da classe base
  override get categoryId(): never {
    throw new Error(
      'categoryId is not accessible from DeviceWithCategoryEntity',
    );
  }
}
