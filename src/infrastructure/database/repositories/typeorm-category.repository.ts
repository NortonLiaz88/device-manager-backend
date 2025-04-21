import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/core/domain/entities/category.entity';
import { CategoryRepository } from 'src/core/domain/repositories/category.repository';
import { Repository } from 'typeorm';
import { CategoryOrmEntity } from '../orm/entities/category.orm-entity';
import { CategoryMapper } from '../mappers/category.mapper';

@Injectable()
export class TypeOrmCategoryRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryOrmEntity)
    private readonly repo: Repository<CategoryOrmEntity>,
  ) {}

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    const orm = CategoryMapper.toOrm(category);
    const saved = await this.repo.save(orm);
    return CategoryMapper.toDomain(saved);
  }

  async findAll(): Promise<CategoryEntity[]> {
    const all = await this.repo.find();
    return all.map(CategoryMapper.toDomain);
  }

  async findById(id: number): Promise<CategoryEntity | null> {
    const found = await this.repo.findOne({ where: { id } });
    return found ? CategoryMapper.toDomain(found) : null;
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const found = await this.repo.findOne({ where: { name } });
    return found ? CategoryMapper.toDomain(found) : null;
  }

  async update(category: CategoryEntity): Promise<CategoryEntity> {
    const orm = CategoryMapper.toOrm(category);
    const saved = await this.repo.save(orm);
    return CategoryMapper.toDomain(saved);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async paginate({
    page,
    limit,
    id,
    name,
    orderBy,
    orderDir,
  }: {
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
  }> {
    const qb = this.repo.createQueryBuilder('category');

    if (id) {
      qb.andWhere('category.id = :id', { id });
    }

    if (name) {
      qb.andWhere('LOWER(category.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    qb.orderBy(`category.${orderBy}`, orderDir)
      .skip((page - 1) * limit)
      .take(limit);

    const [entities, total] = await qb.getManyAndCount();

    return {
      data: entities.map(CategoryMapper.toDomain),
      total,
      page,
      limit,
    };
  }
}
