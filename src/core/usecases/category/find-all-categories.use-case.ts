import { Injectable, Inject } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryEntity } from '../../domain/entities/category.entity';

@Injectable()
export class FindAllCategoriesUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly repository: CategoryRepository,
  ) {}

  async execute(): Promise<CategoryEntity[]> {
    return this.repository.findAll();
  }
}
