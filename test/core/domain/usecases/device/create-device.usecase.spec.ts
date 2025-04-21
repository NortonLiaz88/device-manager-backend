import { CategoryEntity } from 'src/core/domain/entities/category.entity';
import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { CategoryRepository } from 'src/core/domain/repositories/category.repository';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';
import { CreateDeviceUseCase } from 'src/core/usecases/device/create-device.usecase';
import { mockCategoryRepository } from 'test/mocks/category.repository.mock';
import { mockDeviceRepository } from 'test/mocks/device.repository.mock';

describe('CreateDeviceUseCase', () => {
  let deviceRepo: jest.Mocked<DeviceRepository>;
  let categoryRepo: jest.Mocked<CategoryRepository>;
  let useCase: CreateDeviceUseCase;

  beforeEach(() => {
    deviceRepo = mockDeviceRepository();

    categoryRepo = mockCategoryRepository();

    useCase = new CreateDeviceUseCase(deviceRepo, categoryRepo);
  });

  it('should create a device when category exists', async () => {
    const category = new CategoryEntity(1, 'Laptops');
    const input = {
      categoryId: 1,
      color: 'Red',
      partNumber: 1234,
    };

    const expectedDevice = new DeviceEntity(1, 1, 'Red', 1234);

    categoryRepo.findById.mockResolvedValue(category);
    deviceRepo.create.mockResolvedValue(expectedDevice);

    const result = await useCase.execute(input);

    expect(result).toEqual(expectedDevice);
    expect(categoryRepo.findById).toHaveBeenCalledWith(1);
    expect(deviceRepo.create).toHaveBeenCalledWith(
      expect.any(DeviceEntity),
      category,
    );
  });

  it('should throw an error if category does not exist', async () => {
    categoryRepo.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({ categoryId: 99, color: 'Blue', partNumber: 999 }),
    ).rejects.toThrow('Category with id 99 does not exist');

    expect(categoryRepo.findById).toHaveBeenCalledWith(99);
    expect(deviceRepo.create).not.toHaveBeenCalled();
  });
});
