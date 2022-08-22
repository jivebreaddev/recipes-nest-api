import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';
import { Recipe } from '../entities/recipe.entity';
export class CreateIngredientDto {
  @IsString()
  name: string;
  @Optional()
  recipe: Recipe;
}
