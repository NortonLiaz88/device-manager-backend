import { CategoryRepository } from 'src/core/domain/repositories/category.repository';
import { FindCategoryByIdUseCase } from 'src/core/usecases/find-category-by-id.use-case';
import {
  mockCategoryRepository,
  sampleCategory,
} from 'test/mocks/category.repository.mock';

describe('FindCategoryByIdUseCase', () => {
  const mockRepo = mockCategoryRepository();
  const useCase = new FindCategoryByIdUseCase(mockRepo as CategoryRepository);

  it('should return a category by id', async () => {
    mockRepo.findById.mockResolvedValue(sampleCategory);
    const result = await useCase.execute(1);

    expect(result).toEqual(sampleCategory);
  });

  it('should throw if category not found', async () => {
    mockRepo.findById.mockResolvedValue(null);
    await expect(useCase.execute(99)).rejects.toThrow(
      'Category with id 99 not found',
    );
  });
});
