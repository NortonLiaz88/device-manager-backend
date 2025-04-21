import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';
import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { DeviceOrmEntity } from '../orm/entities/device.orm-entity';
import { CategoryEntity } from 'src/core/domain/entities/category.entity';
import { Injectable } from '@nestjs/common';
import { DeviceWithCategoryEntity } from 'src/core/domain/entities/device-with-category';

@Injectable()
export class DeviceTypeOrmRepository implements DeviceRepository {
  constructor(
    @InjectRepository(DeviceOrmEntity)
    private readonly ormRepo: Repository<DeviceOrmEntity>,
  ) {}

  async create(
    device: DeviceEntity,
    category: CategoryEntity,
  ): Promise<DeviceEntity> {
    const saved = await this.ormRepo.save({
      color: device.color,
      partNumber: device.partNumber,
      category, // referência à entidade Category, não só categoryId
    });

    return new DeviceEntity(
      saved.id,
      saved.category.id,
      saved.color,
      saved.partNumber,
    );
  }

  async update(
    device: DeviceEntity,
    category: CategoryEntity,
  ): Promise<DeviceEntity> {
    const updated = await this.ormRepo.save({
      id: device.id,
      color: device.color,
      partNumber: device.partNumber,
      category,
    });

    return new DeviceEntity(
      updated.id,
      updated.category.id,
      updated.color,
      updated.partNumber,
    );
  }

  async findAll(): Promise<DeviceEntity[]> {
    const entities = await this.ormRepo.find({
      relations: ['category'],
    });
    return entities.map(
      (e) => new DeviceEntity(e.id, e.category.id, e.color, e.partNumber),
    );
  }

  async findById(id: number): Promise<DeviceEntity | null> {
    const found = await this.ormRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!found) return null;
    return new DeviceEntity(
      found.id,
      found.category.id,
      found.color,
      found.partNumber,
    );
  }

  async findByPartNumber(partNumber: number): Promise<DeviceEntity | null> {
    const found = await this.ormRepo.findOne({
      where: { partNumber },
      relations: ['category'],
    });
    if (!found) return null;
    return new DeviceEntity(
      found.id,
      found.category.id,
      found.color,
      found.partNumber,
    );
  }

  async delete(id: number): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async paginate(query: {
    page: number;
    limit: number;
    id?: number;
    color?: string;
    partNumber?: number;
    orderBy: 'id' | 'color' | 'partNumber';
    orderDir: 'ASC' | 'DESC';
  }): Promise<{
    data: DeviceWithCategoryEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { page, limit, id, color, partNumber, orderBy, orderDir } = query;

    const where: any = {};
    if (id) where.id = id;
    if (color) where.color = Like(`%${color}%`);
    if (partNumber) where.partNumber = partNumber;

    const [entities, total] = await this.ormRepo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [orderBy]: orderDir,
      },
      relations: ['category'],
    });

    const data = entities.map(
      (e) =>
        new DeviceWithCategoryEntity(e.id, e.category, e.color, e.partNumber),
    );

    return { data, total, page, limit };
  }
}
