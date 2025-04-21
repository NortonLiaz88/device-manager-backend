// src/adapter/controller/dto/create-device.dto.ts
import {
  IsInt,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  categoryId: number;

  @ApiProperty({ example: 'Red', maxLength: 16 })
  @IsString()
  @Matches(/^[A-Za-z]+$/, { message: 'Color must contain only letters' })
  @MaxLength(16)
  color: string;

  @ApiProperty({ example: 12345 })
  @IsInt()
  @IsPositive()
  partNumber: number;
}
