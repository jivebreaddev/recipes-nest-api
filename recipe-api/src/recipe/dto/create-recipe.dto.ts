import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Ingredient } from '../entities/ingredient.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNumber()
  time_minutes: number;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsOptional()
  ingredient: Ingredient[];
}
