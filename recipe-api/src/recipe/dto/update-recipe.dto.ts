import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Ingredient } from '../entities/ingredient.entity';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @ApiProperty()
  title: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  time_minutes: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsOptional()
  ingredient: Ingredient[];
}
