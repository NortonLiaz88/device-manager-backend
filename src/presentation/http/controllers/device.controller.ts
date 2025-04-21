// src/adapter/controller/device.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateDeviceUseCase } from 'src/core/usecases/device/create-device.usecase';
import { DeleteDeviceUseCase } from 'src/core/usecases/device/delete-device.usecase';
import { GetAllDevicesUseCase } from 'src/core/usecases/device/get-all-devices.usecase';
import { GetDeviceByIdUseCase } from 'src/core/usecases/device/get-device-by-id.usecase';
import { GetPaginatedDevicesUseCase } from 'src/core/usecases/device/get-paginated-devices.usecase';
import { CreateDeviceDto } from '../dtos/device/create-device.dto';
import { PaginateDeviceQueryDto } from '../dtos/device/paginate-device-query.dto';
import { UpdateDeviceDto } from '../dtos/device/update-device.dto';
import { UpdateDeviceUseCase } from 'src/core/usecases/device/update-device.usecase';
import { PaginatedDevicesResponseDto } from '../dtos/device/device-response.dto';

@ApiTags('Devices')
@Controller('devices')
export class DeviceController {
  constructor(
    private readonly createDevice: CreateDeviceUseCase,
    private readonly updateDevice: UpdateDeviceUseCase,
    private readonly getAllDevices: GetAllDevicesUseCase,
    private readonly getDeviceById: GetDeviceByIdUseCase,
    private readonly deleteDevice: DeleteDeviceUseCase,
    private readonly getPaginatedDevices: GetPaginatedDevicesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new device' })
  @ApiResponse({ status: 201, description: 'Device created successfully' })
  async create(@Body() dto: CreateDeviceDto) {
    return await this.createDevice.execute(dto);
  }

  @Get('/paginated')
  @ApiOkResponse({ type: PaginatedDevicesResponseDto })
  @ApiOperation({ summary: 'Get paginated list of devices with filters' })
  async paginate(@Query() query: PaginateDeviceQueryDto) {
    return await this.getPaginatedDevices.execute(query);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update device by ID' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDeviceDto,
  ) {
    try {
      return await this.updateDevice.execute({ id, ...dto });
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all devices' })
  async findAll() {
    return await this.getAllDevices.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get device by ID' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const device = await this.getDeviceById.execute(id);

    if (!device) {
      throw new NotFoundException(`Device with id ${id} not found`);
    }
    return device;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete device by ID' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.deleteDevice.execute(id);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
