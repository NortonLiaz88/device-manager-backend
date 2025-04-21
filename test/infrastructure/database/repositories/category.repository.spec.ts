import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryOrmEntity } from 'src/infrastructure/database/entities/category.orm-entity';
import { DeviceOrmEntity } from 'src/infrastructure/database/entities/device.orm-entity';
import { TypeOrmCategoryRepository } from 'src/infrastructure/database/repositories/typeorm-category.repository';
import { CategoryEntity } from 'src/core/domain/entities/category.entity';
import { CategoryRepository } from 'src/core/domain/repositories/category.repository';
import { INestApplication } from '@nestjs/common';

jest.setTimeout(20000); // aumenta o timeout se necessário

describe('TypeOrmCategoryRepository', () => {
  let app: INestApplication;
  let repo: CategoryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [CategoryOrmEntity, DeviceOrmEntity],
          synchronize: true,
          logging: false,
        }),
        TypeOrmModule.forFeature([CategoryOrmEntity]),
      ],
      providers: [
        {
          provide: 'CategoryRepository',
          useClass: TypeOrmCategoryRepository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    repo = module.get<CategoryRepository>('CategoryRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create and find a category', async () => {
    const category = await repo.create(new CategoryEntity(undefined, 'Games'));
    expect(category.id).toBeDefined();

    const found = await repo.findById(category.id!);
    expect(found?.name).toBe('Games');
  });

  it('should update a category', async () => {
    const category = await repo.create(new CategoryEntity(undefined, 'Old'));
    const updated = await repo.update(new CategoryEntity(category.id, 'Updated'));
    expect(updated.name).toBe('Updated');
  });

  it('should delete a category', async () => {
    const category = await repo.create(new CategoryEntity(undefined, 'To Delete'));
    await repo.delete(category.id!);
    const found = await repo.findById(category.id!);
    expect(found).toBeNull();
  });

  it('should list all categories', async () => {
    await repo.create(new CategoryEntity(undefined, 'One'));
    await repo.create(new CategoryEntity(undefined, 'Two'));
    const categories = await repo.findAll();
    expect(categories.length).toBeGreaterThanOrEqual(2);
  });

  it('should return paginated results with filters and sorting', async () => {
    await repo.create(new CategoryEntity(null, 'Tech'));
    await repo.create(new CategoryEntity(null, 'Books'));
    await repo.create(new CategoryEntity(null, 'Gaming'));

    const paginated = await repo.paginate({
      page: 1,
      limit: 2,
      name: 'o', // match "Books" and "Gaming"
      orderBy: 'name',
      orderDir: 'ASC',
    });

    expect(paginated.page).toBe(1);
    expect(paginated.limit).toBe(2);
    expect(paginated.total).toBeGreaterThanOrEqual(2);
    expect(paginated.data.length).toBeLessThanOrEqual(2);
    expect(paginated.data[0].name).toBe('Books'); // ASC order
  });

  it('should return results filtered by id', async () => {
    // Cria duas categorias
    const tech = await repo.create(new CategoryEntity(null, 'Tech'));
    await repo.create(new CategoryEntity(null, 'Gaming'));

    // Busca apenas pela categoria 'Tech' usando o ID
    const paginated = await repo.paginate({
      page: 1,
      limit: 10,
      id: tech.id, // 👈 filtrando por ID
      orderBy: 'id',
      orderDir: 'ASC',
    });

    expect(paginated.total).toBe(1);
    expect(paginated.data.length).toBe(1);
    expect(paginated.data[0].id).toBe(tech.id);
    expect(paginated.data[0].name).toBe('Tech');
  });
});
