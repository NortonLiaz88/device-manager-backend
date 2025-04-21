import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';
import { DeleteDeviceUseCase } from 'src/core/usecases/device/delete-device.usecase';

describe('DeleteDeviceUseCase', () => {
  let deviceRepo: jest.Mocked<DeviceRepository>;
  let useCase: DeleteDeviceUseCase;

  beforeEach(() => {
    deviceRepo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      paginate: jest.fn(),
    };

    useCase = new DeleteDeviceUseCase(deviceRepo);
  });

  it('should delete a device when it exists', async () => {
    const device = new DeviceEntity(1, 1, 'White', 123);

    deviceRepo.findById.mockResolvedValue(device);
    deviceRepo.delete.mockResolvedValue();

    await useCase.execute(1);

    expect(deviceRepo.findById).toHaveBeenCalledWith(1);
    expect(deviceRepo.delete).toHaveBeenCalledWith(1);
  });

  it('should throw an error if device does not exist', async () => {
    deviceRepo.findById.mockResolvedValue(null);

    await expect(useCase.execute(999)).rejects.toThrow(
      'Device with id 999 not found',
    );

    expect(deviceRepo.findById).toHaveBeenCalledWith(999);
    expect(deviceRepo.delete).not.toHaveBeenCalled();
  });
});
