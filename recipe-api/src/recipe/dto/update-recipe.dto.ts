import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Ingredient } from '../entities/ingredient.entity';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsNumber()
  time_minutes: number;
  @IsOptional()
  @IsNumber()
  price: number;
  @IsOptional()
  ingredient: Ingredient[];
}
