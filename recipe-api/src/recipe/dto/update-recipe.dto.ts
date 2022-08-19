import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
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
}
