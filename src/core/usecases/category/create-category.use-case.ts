import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CategoryEntity } from '../../domain/entities/category.entity';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly repository: CategoryRepository,
  ) {}

  async execute(name: string): Promise<CategoryEntity> {
    const category = new CategoryEntity(undefined, name);
    const existingCategory = await this.repository.findByName(name);
    if (existingCategory) {
      throw new ConflictException(`Category with name ${name} already exists`);
    }
    return await this.repository.create(category);
  }
}
