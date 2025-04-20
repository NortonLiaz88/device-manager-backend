import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCategoryUseCase } from 'src/core/usecases/create-category.use-case';
import { DeleteCategoryUseCase } from 'src/core/usecases/delete-category.use-case';
import { FindAllCategoriesUseCase } from 'src/core/usecases/find-all-categories.use-case';
import { FindCategoryByIdUseCase } from 'src/core/usecases/find-category-by-id.use-case';
import { PaginatedCategoriesUseCase } from 'src/core/usecases/paginated-categories.use-case';
import { UpdateCategoryUseCase } from 'src/core/usecases/update-category.use-case';
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
})
export class CategoryModule {}
