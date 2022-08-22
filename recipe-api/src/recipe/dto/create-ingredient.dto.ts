import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';
import { Recipe } from '../entities/recipe.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateIngredientDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @Optional()
  recipe: Recipe;
}
