import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Eletrônicos', maxLength: 128 })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  name: string;
}
