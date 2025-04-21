import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Livros' })
  @IsString()
  @MaxLength(128)
  name: string;
}
