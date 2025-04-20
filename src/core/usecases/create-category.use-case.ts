import { Injectable, Inject } from '@nestjs/common';
import { CategoryRepository } from '../domain/repositories/category.repository';
import { Category } from '../domain/entities/category.entity';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly repository: CategoryRepository,
  ) {}

  async execute(name: string): Promise<Category> {
    const category = new Category(undefined, name);
    return await this.repository.create(category);
  }
}
