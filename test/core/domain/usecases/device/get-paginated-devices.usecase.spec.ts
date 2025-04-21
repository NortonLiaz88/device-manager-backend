import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';
import { GetPaginatedDevicesUseCase } from 'src/core/usecases/device/get-paginated-devices.usecase';
import { mockDeviceRepository } from 'test/mocks/device.repository.mock';

describe('GetPaginatedDevicesUseCase', () => {
  let deviceRepo: jest.Mocked<DeviceRepository>;
  let useCase: GetPaginatedDevicesUseCase;

  beforeEach(() => {
    deviceRepo = mockDeviceRepository();

    useCase = new GetPaginatedDevicesUseCase(deviceRepo);
  });

  it('should return paginated devices', async () => {
    const mockDevices = [
      new DeviceEntity(1, 1, 'Red', 100),
      new DeviceEntity(2, 2, 'Blue', 200),
    ];

    const paginationParams = {
      page: 1,
      limit: 10,
      orderBy: 'id' as const,
      orderDir: 'ASC' as const,
    };

    deviceRepo.paginate.mockResolvedValue({
      data: mockDevices,
      total: 2,
      page: 1,
      limit: 10,
    });

    const result = await useCase.execute(paginationParams);

    expect(result).toEqual({
      data: mockDevices,
      total: 2,
      page: 1,
      limit: 10,
    });

    expect(deviceRepo.paginate).toHaveBeenCalledWith(paginationParams);
  });
});
