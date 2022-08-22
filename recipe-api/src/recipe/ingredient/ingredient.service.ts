import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { UpdateIngredientDto } from '../dto/update-ingredient.dto';
import { Ingredient } from '../entities/ingredient.entity';
import { Recipe } from '../entities/recipe.entity';
import { RecipeService } from '../recipe.service';

@Injectable()
export class IngredientService {
  constructor(@InjectRepository(Ingredient) private ingredientRepository) {}

  async create(CreateIngredientDto, recipe) {
    const ingredient = await this.ingredientRepository.create({
      ...CreateIngredientDto,
    });
    ingredient.recipe = recipe;
    return this.ingredientRepository.save(ingredient);
  }
  async findAll() {
    const ingredients = await this.ingredientRepository.find();
    return ingredients;
  }

  async findOne(name: string) {
    const ingredients = await this.ingredientRepository.findBy({
      name: name,
    });
    if (!ingredients) {
      throw new NotFoundException('Ingredient name is not found');
    }
    return ingredients;
  }
  async update(name: string, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.ingredientRepository.findOneBy({
      name: name,
    });
    if (!ingredient) {
      throw new NotFoundException('ingredient not found');
    }
    Object.assign(ingredient, updateIngredientDto);
    return ingredient;
  }
  async remove(name: string) {
    const ingredient = await this.ingredientRepository.findOneBy({
      name: name,
    });
    if (!ingredient) {
      throw new NotFoundException('ingredient not found');
    }

    await this.ingredientRepository.remove(ingredient);
  }
}
