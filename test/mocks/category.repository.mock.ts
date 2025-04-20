import { Category } from '../../src/core/domain/entities/category.entity';

export const mockCategoryRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  paginate: jest.fn(),
});

export const sampleCategory = new Category(1, 'Tech');
