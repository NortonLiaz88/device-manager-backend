import { Injectable, Inject } from '@nestjs/common';
import { CategoryRepository } from '../domain/repositories/category.repository';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly repository: CategoryRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
