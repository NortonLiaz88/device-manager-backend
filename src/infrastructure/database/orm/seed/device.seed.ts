import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { DeviceOrmEntity } from '../entities/device.orm-entity';
import { CategoryOrmEntity } from '../entities/category.orm-entity';

export class DeviceSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const deviceRepo = dataSource.getRepository(DeviceOrmEntity);
    const categoryRepo = dataSource.getRepository(CategoryOrmEntity);

    const categories = await categoryRepo.find();

    const devices = Array.from({ length: 300 }).map(() => {
      const category = faker.helpers.arrayElement(categories);
      const color = faker.color.human().replace(/\s/g, '').slice(0, 16); // Remove espaços e limita tamanho

      return deviceRepo.create({
        category: {
          id: category.id,
        },
        color: color,
        partNumber: faker.number.int({ min: 1, max: 99999 }),
      });
    });

    await deviceRepo.save(devices);
  }
}
