import { Injectable, Inject } from '@nestjs/common';
import { CategoryRepository } from '../domain/repositories/category.repository';
import { Category } from '../domain/entities/category.entity';

@Injectable()
export class FindAllCategoriesUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly repository: CategoryRepository,
  ) {}

  async execute(): Promise<Category[]> {
    return this.repository.findAll();
  }
}
