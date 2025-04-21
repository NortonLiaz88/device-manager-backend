import { CategoryRepository } from 'src/core/domain/repositories/category.repository';
import { FindAllCategoriesUseCase } from 'src/core/usecases/category/find-all-categories.use-case';
import {
  mockCategoryRepository,
  sampleCategory,
} from 'test/mocks/category.repository.mock';

describe('FindAllCategoriesUseCase', () => {
  const mockRepo = mockCategoryRepository();
  const useCase = new FindAllCategoriesUseCase(mockRepo as CategoryRepository);

  it('should return all categories', async () => {
    mockRepo.findAll.mockResolvedValue([sampleCategory]);
    const result = await useCase.execute();

    expect(result).toEqual([sampleCategory]);
  });
});
