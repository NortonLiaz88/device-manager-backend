import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../domain/repositories/category.repository';
import { Category } from '../domain/entities/category.entity';

interface PaginatedQuery {
  page: number;
  limit: number;
  id?: number;
  name?: string;
  orderBy: 'id' | 'name';
  orderDir: 'ASC' | 'DESC';
}

@Injectable()
export class PaginatedCategoriesUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly repo: CategoryRepository,
  ) {}

  async execute(query: PaginatedQuery): Promise<{
    data: Category[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.repo.paginate(query);
  }
}
