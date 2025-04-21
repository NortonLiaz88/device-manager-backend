import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly repository: CategoryRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return this.repository.delete(id);
  }
}
