import { CategoryEntity } from 'src/core/domain/entities/category.entity';
import { CategoryOrmEntity } from '../entities/category.orm-entity';

export class CategoryMapper {
  static toDomain(entity: CategoryOrmEntity): CategoryEntity {
    return new CategoryEntity(entity.id, entity.name);
  }

  static toOrm(entity: CategoryEntity): CategoryOrmEntity {
    const orm = new CategoryOrmEntity();
    orm.id = entity.id;
    orm.name = entity.name;
    return orm;
  }
}
