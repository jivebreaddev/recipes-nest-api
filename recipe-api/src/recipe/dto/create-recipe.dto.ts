import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Ingredient } from '../entities/ingredient.entity';
export class CreateRecipeDto {
  @IsNumber()
  id: number;
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsNumber()
  time_minutes: number;
  @IsNumber()
  price: number;
  @IsOptional()
  ingredient: Ingredient[];
}
