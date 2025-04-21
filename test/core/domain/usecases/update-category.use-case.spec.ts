import { CategoryRepository } from 'src/core/domain/repositories/category.repository';
import { UpdateCategoryUseCase } from 'src/core/usecases/category/update-category.use-case';
import {
  mockCategoryRepository,
  sampleCategory,
} from 'test/mocks/category.repository.mock';

describe('UpdateCategoryUseCase', () => {
  const mockRepo = mockCategoryRepository();
  const useCase = new UpdateCategoryUseCase(mockRepo as CategoryRepository);

  it('should update the category name', async () => {
    mockRepo.findById.mockResolvedValue(sampleCategory);
    mockRepo.update.mockImplementation((cat) => Promise.resolve(cat));

    const result = await useCase.execute(1, 'Updated');
    expect(result.name).toBe('Updated');
    expect(mockRepo.update).toHaveBeenCalled();
  });

  it('should throw if category does not exist', async () => {
    mockRepo.findById.mockResolvedValue(null);
    await expect(useCase.execute(2, 'Updated')).rejects.toThrow(
      'Category with id 2 not found',
    );
  });
});
