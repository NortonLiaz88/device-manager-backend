import { ApiProperty } from '@nestjs/swagger';

class DeviceCategoryDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Notebook' })
  name: string;
}

class DeviceResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 123456 })
  partNumber: number;

  @ApiProperty({ example: 'Azul' })
  color: string;

  @ApiProperty({ type: DeviceCategoryDto })
  category: DeviceCategoryDto;
}

export class PaginatedDevicesResponseDto {
  @ApiProperty({ type: [DeviceResponseDto] })
  data: DeviceResponseDto[];

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}
