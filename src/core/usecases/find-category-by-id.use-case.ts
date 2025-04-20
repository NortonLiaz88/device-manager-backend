import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../domain/repositories/category.repository';
import { Category } from '../domain/entities/category.entity';

@Injectable()
export class FindCategoryByIdUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly repository: CategoryRepository,
  ) {}

  async execute(id: number): Promise<Category> {
    const category = await this.repository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }
}
