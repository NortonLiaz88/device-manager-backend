import { DeviceWithCategoryEntity } from 'src/core/domain/entities/device-with-category';
import { DeviceRepository } from 'src/core/domain/repositories/device.repository';
import { GetPaginatedDevicesUseCase } from 'src/core/usecases/device/get-paginated-devices.usecase';
import { sampleCategory } from 'test/mocks/category.repository.mock';
import { mockDeviceRepository } from 'test/mocks/device.repository.mock';

describe('GetPaginatedDevicesUseCase', () => {
  let deviceRepo: jest.Mocked<DeviceRepository>;
  let useCase: GetPaginatedDevicesUseCase;

  beforeEach(() => {
    deviceRepo = mockDeviceRepository();

    useCase = new GetPaginatedDevicesUseCase(deviceRepo);
  });

  it('should return paginated devices', async () => {
    const category = sampleCategory;
    const mockDevices = [
      new DeviceWithCategoryEntity(1, category, 'Red', 100),
      new DeviceWithCategoryEntity(2, category, 'Blue', 200),
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
