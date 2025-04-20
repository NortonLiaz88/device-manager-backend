import { CategoryRepository } from 'src/core/domain/repositories/category.repository';
import { DeleteCategoryUseCase } from 'src/core/usecases/delete-category.use-case';
import { mockCategoryRepository } from 'test/mocks/category.repository.mock';

describe('DeleteCategoryUseCase', () => {
  const mockRepo = mockCategoryRepository();
  const useCase = new DeleteCategoryUseCase(mockRepo as CategoryRepository);

  it('should delete category by id', async () => {
    mockRepo.delete.mockResolvedValue(undefined);
    await expect(useCase.execute(1)).resolves.toBeUndefined();
    expect(mockRepo.delete).toHaveBeenCalledWith(1);
  });
});
