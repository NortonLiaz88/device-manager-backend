import { CategoryEntity } from 'src/core/domain/entities/category.entity';
import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { CategoryRepository } from 'src/core/domain/repositories/category.repository';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';
import { UpdateDeviceUseCase } from 'src/core/usecases/device/update-device.usecase';
import { mockCategoryRepository } from 'test/mocks/category.repository.mock';
import { mockDeviceRepository } from 'test/mocks/device.repository.mock';

describe('UpdateDeviceUseCase', () => {
  let deviceRepo: jest.Mocked<DeviceRepository>;
  let categoryRepo: jest.Mocked<CategoryRepository>;
  let useCase: UpdateDeviceUseCase;

  beforeEach(() => {
    deviceRepo = mockDeviceRepository();
    categoryRepo = mockCategoryRepository();

    useCase = new UpdateDeviceUseCase(deviceRepo, categoryRepo);
  });

  it('should update a device when both device and category exist', async () => {
    const existingDevice = new DeviceEntity(1, 1, 'Red', 1234);
    const existingCategory = new CategoryEntity(2, 'Smartphones');

    const input = {
      id: 1,
      categoryId: 2,
      color: 'Blue',
      partNumber: 4321,
    };

    const updatedDevice = new DeviceEntity(1, 2, 'Blue', 4321);

    deviceRepo.findById.mockResolvedValue(existingDevice);
    categoryRepo.findById.mockResolvedValue(existingCategory);
    deviceRepo.update.mockResolvedValue(updatedDevice);

    const result = await useCase.execute(input);

    expect(result).toEqual(updatedDevice);
    expect(deviceRepo.findById).toHaveBeenCalledWith(1);
    expect(categoryRepo.findById).toHaveBeenCalledWith(2);
    expect(deviceRepo.update).toHaveBeenCalledWith(
      expect.any(DeviceEntity),
      existingCategory,
    );
  });

  it('should throw an error if the device does not exist', async () => {
    deviceRepo.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({
        id: 999,
        categoryId: 1,
        color: 'Green',
        partNumber: 777,
      }),
    ).rejects.toThrow('Device with id 999 not found');

    expect(deviceRepo.findById).toHaveBeenCalledWith(999);
    expect(categoryRepo.findById).not.toHaveBeenCalled();
    expect(deviceRepo.update).not.toHaveBeenCalled();
  });

  it('should throw an error if the category does not exist', async () => {
    const existingDevice = new DeviceEntity(1, 1, 'Red', 1234);

    deviceRepo.findById.mockResolvedValue(existingDevice);
    categoryRepo.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({
        id: 1,
        categoryId: 999,
        color: 'Green',
        partNumber: 777,
      }),
    ).rejects.toThrow('Category with id 999 not found');

    expect(deviceRepo.findById).toHaveBeenCalledWith(1);
    expect(categoryRepo.findById).toHaveBeenCalledWith(999);
    expect(deviceRepo.update).not.toHaveBeenCalled();
  });
});
