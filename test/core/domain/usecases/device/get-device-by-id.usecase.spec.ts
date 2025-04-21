import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';
import { GetDeviceByIdUseCase } from 'src/core/usecases/device/get-device-by-id.usecase';
import { mockDeviceRepository } from 'test/mocks/device.repository.mock';

describe('GetDeviceByIdUseCase', () => {
  let deviceRepo: jest.Mocked<DeviceRepository>;
  let useCase: GetDeviceByIdUseCase;

  beforeEach(() => {
    deviceRepo = mockDeviceRepository();

    useCase = new GetDeviceByIdUseCase(deviceRepo);
  });

  it('should return a device when it exists', async () => {
    const device = new DeviceEntity(1, 1, 'Black', 111);

    deviceRepo.findById.mockResolvedValue(device);

    const result = await useCase.execute(1);

    expect(result).toEqual(device);
    expect(deviceRepo.findById).toHaveBeenCalledWith(1);
  });

  it('should return null when device is not found', async () => {
    deviceRepo.findById.mockResolvedValue(null);

    const result = await useCase.execute(999);

    expect(result).toBeNull();
    expect(deviceRepo.findById).toHaveBeenCalledWith(999);
  });
});
