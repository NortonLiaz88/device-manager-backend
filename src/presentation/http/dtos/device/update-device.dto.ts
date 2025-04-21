// src/adapter/controller/dto/update-device.dto.ts
import {
  IsInt,
  IsPositive,
  IsString,
  Matches,
  Max,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeviceDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  categoryId: number;

  @ApiProperty({ example: 'Red' })
  @IsString()
  @Matches(/^[A-Za-z]+$/)
  @MaxLength(16)
  color: string;

  @ApiProperty({ example: 1234 })
  @IsInt()
  @IsPositive()
  @Max(2147483647)
  partNumber: number;
}
