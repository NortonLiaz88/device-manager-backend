import { CategoryEntity } from 'src/core/domain/entities/category.entity';
import { CategoryOrmEntity } from 'src/infrastructure/database/entities/category.orm-entity';
import { CategoryMapper } from 'src/infrastructure/database/mappers/category.mapper';

describe('CategoryMapper', () => {
  it('should convert ORM to domain', () => {
    const orm = new CategoryOrmEntity();
    orm.id = 1;
    orm.name = 'Books';

    const domain = CategoryMapper.toDomain(orm);

    expect(domain).toBeInstanceOf(CategoryEntity);
    expect(domain.id).toBe(1);
    expect(domain.name).toBe('Books');
  });

  it('should convert domain to ORM', () => {
    const domain = new CategoryEntity(2, 'Tech');

    const orm = CategoryMapper.toOrm(domain);

    expect(orm).toBeInstanceOf(CategoryOrmEntity);
    expect(orm.id).toBe(2);
    expect(orm.name).toBe('Tech');
  });
});
