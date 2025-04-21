import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/core/domain/entities/category.entity';

import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { CategoryOrmEntity } from 'src/infrastructure/database/entities/category.orm-entity';
import { DeviceOrmEntity } from 'src/infrastructure/database/entities/device.orm-entity';
import { DeviceTypeOrmRepository } from 'src/infrastructure/database/repositories/device.typeorm.repository';
import { TypeOrmCategoryRepository } from 'src/infrastructure/database/repositories/typeorm-category.repository';

describe('DeviceTypeOrmRepository', () => {
  let deviceRepo: DeviceTypeOrmRepository;
  let categoryRepo: TypeOrmCategoryRepository;
  let category: CategoryEntity;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [DeviceOrmEntity, CategoryOrmEntity],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([DeviceOrmEntity, CategoryOrmEntity]),
      ],
      providers: [
        { provide: 'DeviceRepository', useClass: DeviceTypeOrmRepository },
        { provide: 'CategoryRepository', useClass: TypeOrmCategoryRepository },
        DeviceTypeOrmRepository,
        TypeOrmCategoryRepository,
      ],
    }).compile();

    deviceRepo = module.get(DeviceTypeOrmRepository);
    categoryRepo = module.get(TypeOrmCategoryRepository);

    const createdCategory = await categoryRepo.create(
      new CategoryEntity(0, 'Smartphones'),
    );
    category = createdCategory;
  });

  it('should create a device', async () => {
    const device = new DeviceEntity(0, category.id, 'Blue', 123);
    const saved = await deviceRepo.create(device, category);

    expect(saved.id).toBeDefined();
    expect(saved.color).toBe('Blue');
  });

  it('should find all devices', async () => {
    const all = await deviceRepo.findAll();
    expect(all.length).toBeGreaterThan(0);
  });

  it('should find a device by ID', async () => {
    const device = new DeviceEntity(0, category.id, 'Green', 456);
    const saved = await deviceRepo.create(device, category);

    const found = await deviceRepo.findById(saved.id);
    expect(found?.color).toBe('Green');
  });

  it('should update a device', async () => {
    const device = new DeviceEntity(0, category.id, 'Red', 789);
    const saved = await deviceRepo.create(device, category);

    const updated = new DeviceEntity(saved.id, category.id, 'Yellow', 1010);
    const result = await deviceRepo.update(updated, category);

    expect(result.color).toBe('Yellow');
    expect(result.partNumber).toBe(1010);
  });

  it('should delete a device', async () => {
    const device = new DeviceEntity(0, category.id, 'Gray', 2020);
    const saved = await deviceRepo.create(device, category);

    await deviceRepo.delete(saved.id);
    const afterDelete = await deviceRepo.findById(saved.id);
    expect(afterDelete).toBeNull();
  });

  it('should paginate devices', async () => {
    const result = await deviceRepo.paginate({
      page: 1,
      limit: 10,
      orderBy: 'id',
      orderDir: 'ASC',
      id: undefined,
    });

    expect(result.data.length).toBeGreaterThan(0);
    expect(result.total).toBeGreaterThan(0);
  });

  it('should filter devices by color', async () => {
    const device = new DeviceEntity(0, category.id, 'OrangeFilter', 3000);
    await deviceRepo.create(device, category);

    const result = await deviceRepo.paginate({
      page: 1,
      limit: 10,
      orderBy: 'id',
      orderDir: 'ASC',
      color: 'Orange',
    });

    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data[0].color).toContain('Orange');
  });

  it('should filter devices by partNumber', async () => {
    const device = new DeviceEntity(0, category.id, 'FilterByNumber', 5678);
    await deviceRepo.create(device, category);

    const result = await deviceRepo.paginate({
      page: 1,
      limit: 10,
      orderBy: 'id',
      orderDir: 'ASC',
      partNumber: 5678,
    });

    expect(result.data.length).toBe(1);
    expect(result.data[0].partNumber).toBe(5678);
  });

  it('should filter devices by id', async () => {
    const device = await deviceRepo.create(
      new DeviceEntity(0, category.id, 'SearchById', 4444),
      category,
    );

    const result = await deviceRepo.paginate({
      page: 1,
      limit: 10,
      orderBy: 'id',
      orderDir: 'ASC',
      id: device.id,
    });

    expect(result.data.length).toBe(1);
    expect(result.data[0].id).toBe(device.id);
  });
});
