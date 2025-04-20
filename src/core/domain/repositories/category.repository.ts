import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  create(category: Category): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category | null>;
  delete(id: number): Promise<void>;
  update(category: Category): Promise<Category>;
  paginate(query: {
    page: number;
    limit: number;
    id?: number;
    name?: string;
    orderBy: 'id' | 'name';
    orderDir: 'ASC' | 'DESC';
  }): Promise<{ data: Category[]; total: number; page: number; limit: number }>;
}
