import { CategoryRepository } from 'src/core/domain/repositories/category.repository';
import { CreateCategoryUseCase } from 'src/core/usecases/create-category.use-case';
import { mockCategoryRepository } from 'test/mocks/category.repository.mock';

describe('CreateCategoryUseCase', () => {
  const mockRepo = mockCategoryRepository();
  const useCase = new CreateCategoryUseCase(mockRepo as CategoryRepository);

  it('should create a category successfully', async () => {
    mockRepo.create.mockResolvedValue({ id: 1, name: 'Books' });
    const result = await useCase.execute('Books');

    expect(result).toEqual({ id: 1, name: 'Books' });
    expect(mockRepo.create).toHaveBeenCalled();
  });
});
