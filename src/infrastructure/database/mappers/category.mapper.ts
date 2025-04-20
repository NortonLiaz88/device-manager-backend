import { Category } from 'src/core/domain/entities/category.entity';
import { CategoryOrmEntity } from '../entities/category.orm-entity';

export class CategoryMapper {
  static toDomain(entity: CategoryOrmEntity): Category {
    return new Category(entity.id, entity.name);
  }

  static toOrm(entity: Category): CategoryOrmEntity {
    const orm = new CategoryOrmEntity();
    orm.id = entity.id;
    orm.name = entity.name;
    return orm;
  }
}
