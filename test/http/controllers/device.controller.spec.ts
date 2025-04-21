import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { CreateDeviceUseCase } from 'src/core/usecases/device/create-device.usecase';
import { UpdateDeviceUseCase } from 'src/core/usecases/device/update-device.usecase';
import { GetAllDevicesUseCase } from 'src/core/usecases/device/get-all-devices.usecase';
import { GetDeviceByIdUseCase } from 'src/core/usecases/device/get-device-by-id.usecase';
import { DeleteDeviceUseCase } from 'src/core/usecases/device/delete-device.usecase';
import { GetPaginatedDevicesUseCase } from 'src/core/usecases/device/get-paginated-devices.usecase';

import { DeviceEntity } from 'src/core/domain/entities/device.entity';
import { toPlain } from 'test/utils/to-plain'; // helper para comparação limpa
import { DeviceController } from 'src/presentation/http/controllers/device.controller';

describe('DeviceController', () => {
  let app: INestApplication;

  const mockDevice = new DeviceEntity(1, 1, 'Blue', 1234);
  const mockDevice2 = new DeviceEntity(2, 2, 'Red', 5678);

  const mockUseCases = {
    create: { execute: jest.fn() },
    update: { execute: jest.fn() },
    getAll: { execute: jest.fn() },
    getById: { execute: jest.fn() },
    delete: { execute: jest.fn() },
    paginate: { execute: jest.fn() },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      providers: [
        { provide: CreateDeviceUseCase, useValue: mockUseCases.create },
        { provide: UpdateDeviceUseCase, useValue: mockUseCases.update },
        { provide: GetAllDevicesUseCase, useValue: mockUseCases.getAll },
        { provide: GetDeviceByIdUseCase, useValue: mockUseCases.getById },
        { provide: DeleteDeviceUseCase, useValue: mockUseCases.delete },
        {
          provide: GetPaginatedDevicesUseCase,
          useValue: mockUseCases.paginate,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await app.close();
  });

  it('POST /devices - should create a device', async () => {
    mockUseCases.create.execute.mockResolvedValue(mockDevice);

    await request(app.getHttpServer())
      .post('/devices')
      .send({ categoryId: 1, color: 'Blue', partNumber: 1234 })
      .expect(201)
      .expect(toPlain(mockDevice));
  });

  it('GET /devices - should return all devices', async () => {
    mockUseCases.getAll.execute.mockResolvedValue([mockDevice, mockDevice2]);

    await request(app.getHttpServer())
      .get('/devices')
      .expect(200)
      .expect([toPlain(mockDevice), toPlain(mockDevice2)]);
  });

  it('GET /devices/:id - should return device by ID', async () => {
    mockUseCases.getById.execute.mockResolvedValue(mockDevice);

    await request(app.getHttpServer())
      .get('/devices/1')
      .expect(200)
      .expect(toPlain(mockDevice));
  });

  it('GET /devices/:id - should return 404 if not found', async () => {
    mockUseCases.getById.execute.mockResolvedValue(null);

    await request(app.getHttpServer()).get('/devices/999').expect(404).expect({
      statusCode: 404,
      message: 'Device with id 999 not found',
      error: 'Not Found',
    });
  });

  it('DELETE /devices/:id - should delete device', async () => {
    mockUseCases.delete.execute.mockResolvedValue(undefined);

    await request(app.getHttpServer()).delete('/devices/1').expect(200);
  });

  it('DELETE /devices/:id - should return 404 if not found', async () => {
    mockUseCases.delete.execute.mockRejectedValue(
      new Error('Device with id 888 not found'),
    );

    await request(app.getHttpServer())
      .delete('/devices/888')
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Device with id 888 not found',
        error: 'Not Found',
      });
  });

  it('PUT /devices/:id - should update device', async () => {
    const updated = new DeviceEntity(1, 1, 'Green', 999);
    mockUseCases.update.execute.mockResolvedValue(updated);

    await request(app.getHttpServer())
      .put('/devices/1')
      .send({ categoryId: 1, color: 'Green', partNumber: 999 })
      .expect(200)
      .expect(toPlain(updated));
  });

  it('PUT /devices/:id - should return 404 if device not found', async () => {
    mockUseCases.update.execute.mockRejectedValue(
      new Error('Device with id 99 not found'),
    );

    await request(app.getHttpServer())
      .put('/devices/99')
      .send({ categoryId: 1, color: 'Red', partNumber: 111 })
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Device with id 99 not found',
        error: 'Not Found',
      });
  });

  it('GET /devices/paginated - should return paginated devices', async () => {
    const paginationResult = {
      data: [mockDevice],
      total: 1,
      page: 1,
      limit: 10,
    };

    mockUseCases.paginate.execute.mockResolvedValue(paginationResult);

    await request(app.getHttpServer())
      .get('/devices/paginated?page=1&limit=10&orderBy=id&orderDir=ASC')
      .expect(200)
      .expect({
        data: [toPlain(mockDevice)],
        total: 1,
        page: 1,
        limit: 10,
      });
  });
});
