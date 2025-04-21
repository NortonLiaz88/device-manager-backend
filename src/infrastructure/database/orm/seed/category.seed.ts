import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { CategoryOrmEntity } from '../entities/category.orm-entity';

export class CategorySeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repo = dataSource.getRepository(CategoryOrmEntity);

    const categories = Array.from({ length: 100 }).map(() => {
      return repo.create({
        name: faker.commerce.department().slice(0, 128),
      });
    });

    await repo.save(categories);
  }
}
