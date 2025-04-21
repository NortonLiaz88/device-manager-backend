import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryEntity } from '../../domain/entities/category.entity';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly repository: CategoryRepository,
  ) {}

  async execute(id: number, newName: string): Promise<CategoryEntity> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    const updated = new CategoryEntity(existing.id, newName);
    return this.repository.update(updated);
  }
}
