import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCategoryUseCase } from 'src/core/usecases/category/create-category.use-case';
import { DeleteCategoryUseCase } from 'src/core/usecases/category/delete-category.use-case';
import { FindAllCategoriesUseCase } from 'src/core/usecases/category/find-all-categories.use-case';
import { FindCategoryByIdUseCase } from 'src/core/usecases/category/find-category-by-id.use-case';
import { PaginatedCategoriesUseCase } from 'src/core/usecases/category/paginated-categories.use-case';
import { UpdateCategoryUseCase } from 'src/core/usecases/category/update-category.use-case';
import { CategoryOrmEntity } from 'src/infrastructure/database/entities/category.orm-entity';
import { TypeOrmCategoryRepository } from 'src/infrastructure/database/repositories/typeorm-category.repository';
import { CategoryController } from 'src/presentation/http/controllers/category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryOrmEntity])],
  controllers: [CategoryController],
  providers: [
    CreateCategoryUseCase,
    DeleteCategoryUseCase,
    FindAllCategoriesUseCase,
    FindCategoryByIdUseCase,
    UpdateCategoryUseCase,
    PaginatedCategoriesUseCase,
    {
      provide: 'CategoryRepository',
      useClass: TypeOrmCategoryRepository,
    },
  ],
  exports: ['CategoryRepository'],
})
export class CategoryModule {}
