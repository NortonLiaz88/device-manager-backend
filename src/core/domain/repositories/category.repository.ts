import { CategoryEntity } from '../entities/category.entity';

export interface CategoryRepository {
  create(category: CategoryEntity): Promise<CategoryEntity>;
  findAll(): Promise<CategoryEntity[]>;
  findById(id: number): Promise<CategoryEntity | null>;
  findByName(name: string): Promise<CategoryEntity | null>;
  delete(id: number): Promise<void>;
  update(category: CategoryEntity): Promise<CategoryEntity>;
  paginate(query: {
    page: number;
    limit: number;
    id?: number;
    name?: string;
    orderBy: 'id' | 'name';
    orderDir: 'ASC' | 'DESC';
  }): Promise<{
    data: CategoryEntity[];
    total: number;
    page: number;
    limit: number;
  }>;
}
