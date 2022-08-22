import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateIngredientDto {
  @ApiProperty()
  @IsString()
  name: string;
}
