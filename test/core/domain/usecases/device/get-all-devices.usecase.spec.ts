import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';
import { GetAllDevicesUseCase } from 'src/core/usecases/device/get-all-devices.usecase';
import { mockDeviceRepository } from 'test/mocks/device.repository.mock';

describe('GetAllDevicesUseCase', () => {
  let deviceRepo: jest.Mocked<DeviceRepository>;
  let useCase: GetAllDevicesUseCase;

  beforeEach(() => {
    deviceRepo = mockDeviceRepository();
    useCase = new GetAllDevicesUseCase(deviceRepo);
  });

  it('should return all devices', async () => {
    const devices = [
      new DeviceEntity(1, 1, 'Black', 100),
      new DeviceEntity(2, 2, 'White', 200),
    ];

    deviceRepo.findAll.mockResolvedValue(devices);

    const result = await useCase.execute();

    expect(result).toEqual(devices);
    expect(deviceRepo.findAll).toHaveBeenCalled();
  });

  it('should return an empty list if no devices are found', async () => {
    deviceRepo.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(deviceRepo.findAll).toHaveBeenCalled();
  });
});
