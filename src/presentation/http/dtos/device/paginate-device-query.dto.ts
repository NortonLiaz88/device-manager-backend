// src/adapter/controller/dto/paginate-device-query.dto.ts
import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class PaginateDeviceQueryDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page: number;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit: number;

  @ApiPropertyOptional({ example: 5 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiPropertyOptional({ example: 'Red' })
  @IsOptional()
  @IsString()
  @MaxLength(16)
  color?: string;

  @ApiPropertyOptional({ example: 123 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  partNumber?: number;

  @ApiProperty({ example: 'id', enum: ['id', 'color', 'partNumber'] })
  @IsIn(['id', 'color', 'partNumber'])
  orderBy: 'id' | 'color' | 'partNumber';

  @ApiProperty({ example: 'ASC', enum: ['ASC', 'DESC'] })
  @IsIn(['ASC', 'DESC'])
  orderDir: 'ASC' | 'DESC';
}
