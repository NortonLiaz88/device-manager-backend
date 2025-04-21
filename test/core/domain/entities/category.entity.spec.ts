import { CategoryEntity } from 'src/core/domain/entities/category.entity';

describe('Category Entity', () => {
  it('should create category with valid name', () => {
    const category = new CategoryEntity(1, 'Valid Name');
    expect(category.name).toBe('Valid Name');
  });

  it('should throw if name is empty', () => {
    expect(() => new CategoryEntity(1, '')).toThrow('Invalid category name');
  });

  it('should throw if name is too long', () => {
    const longName = 'A'.repeat(129);
    expect(() => new CategoryEntity(1, longName)).toThrow('Invalid category name');
  });
});
