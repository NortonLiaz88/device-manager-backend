import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from 'src/presentation/http/controllers/category.controller';

import { CategoryEntity } from 'src/core/domain/entities/category.entity';
import { CreateCategoryUseCase } from 'src/core/usecases/category/create-category.use-case';
import { DeleteCategoryUseCase } from 'src/core/usecases/category/delete-category.use-case';
import { FindAllCategoriesUseCase } from 'src/core/usecases/category/find-all-categories.use-case';
import { FindCategoryByIdUseCase } from 'src/core/usecases/category/find-category-by-id.use-case';
import { UpdateCategoryUseCase } from 'src/core/usecases/category/update-category.use-case';
import { PaginatedCategoriesUseCase } from 'src/core/usecases/category/paginated-categories.use-case';

describe('CategoryController', () => {
  let controller: CategoryController;
  let paginatedCategories: jest.Mocked<PaginatedCategoriesUseCase>;

  const mockUseCases = {
    createCategory: {
      execute: jest.fn().mockResolvedValue(new CategoryEntity(1, 'Books')),
    },
    findAllCategories: {
      execute: jest.fn().mockResolvedValue([new CategoryEntity(1, 'Books')]),
    },
    findCategoryById: {
      execute: jest.fn().mockResolvedValue(new CategoryEntity(1, 'Books')),
    },
    updateCategory: {
      execute: jest.fn().mockResolvedValue(new CategoryEntity(1, 'Updated')),
    },
    deleteCategory: {
      execute: jest.fn().mockResolvedValue(undefined),
    },
    paginateCategory: {
      execute: jest.fn().mockResolvedValue(undefined),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CreateCategoryUseCase,
          useValue: mockUseCases.createCategory,
        },
        {
          provide: FindAllCategoriesUseCase,
          useValue: mockUseCases.findAllCategories,
        },
        {
          provide: FindCategoryByIdUseCase,
          useValue: mockUseCases.findCategoryById,
        },
        {
          provide: UpdateCategoryUseCase,
          useValue: mockUseCases.updateCategory,
        },
        {
          provide: DeleteCategoryUseCase,
          useValue: mockUseCases.deleteCategory,
        },

        {
          provide: PaginatedCategoriesUseCase,
          useValue: mockUseCases.paginateCategory,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should create a category', async () => {
    const result = await controller.create({ name: 'Books' });
    expect(result).toEqual(new CategoryEntity(1, 'Books'));
  });

  it('should list all categories', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([new CategoryEntity(1, 'Books')]);
  });

  it('should return one category', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual(new CategoryEntity(1, 'Books'));
  });

  it('should update a category', async () => {
    const result = await controller.update(1, { name: 'Updated' });
    expect(result).toEqual(new CategoryEntity(1, 'Updated'));
  });

  it('should delete a category', async () => {
    await expect(controller.delete(1)).resolves.toBeUndefined();
  });

  it('should call paginatedCategories.execute with query parameters', async () => {
    const query = {
      page: 1,
      limit: 5,
      id: 1,
      name: 'Tech',
      orderBy: 'name' as 'name' | 'id',
      orderDir: 'DESC' as 'ASC' | 'DESC',
    };

    const expectedResponse = {
      data: [],
      total: 0,
      page: 1,
      limit: 5,
    };

    // Atualiza o mock para retornar o esperado
    mockUseCases.paginateCategory.execute.mockResolvedValue(expectedResponse);

    const result = await controller.findPaginated(query);

    // ✅ Verifica se o use case foi chamado corretamente
    expect(mockUseCases.paginateCategory.execute).toHaveBeenCalledWith(query);

    // ✅ Verifica o retorno da função do controller
    expect(result).toEqual(expectedResponse);
  });
});
