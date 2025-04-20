import { PaginatedCategoriesUseCase } from 'src/core/usecases/paginated-categories.use-case';
import { CategoryRepository } from 'src/core/domain/repositories/category.repository';
import { Category } from 'src/core/domain/entities/category.entity';

describe('PaginatedCategoriesUseCase', () => {
  let useCase: PaginatedCategoriesUseCase;
  let mockCategoryRepository: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    mockCategoryRepository = {
      paginate: jest.fn(),
    } as unknown as jest.Mocked<CategoryRepository>;

    useCase = new PaginatedCategoriesUseCase(mockCategoryRepository);
  });

  it('should return paginated categories with filters', async () => {
    const expected = {
      data: [new Category(1, 'Tech')],
      total: 1,
      page: 1,
      limit: 10,
    };

    mockCategoryRepository.paginate.mockResolvedValue(expected);

    const result = await useCase.execute({
      page: 1,
      limit: 10,
      name: 'Tech',
      orderBy: 'name',
      orderDir: 'ASC',
    });

    expect(mockCategoryRepository.paginate).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      id: undefined,
      name: 'Tech',
      orderBy: 'name',
      orderDir: 'ASC',
    });

    expect(result).toEqual(expected);
  });
});
