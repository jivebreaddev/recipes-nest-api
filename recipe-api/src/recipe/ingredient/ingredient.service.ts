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
    const ingredient = this.ingredientRepository.create({
      ...CreateIngredientDto,
    });
    ingredient.recipe = recipe;
    return this.ingredientRepository.save(ingredient);
  }
  async findAll() {
    const ingredients = await this.ingredientRepository.find();
    return ingredients;
  }

  async findOne(id: number) {
    const ingredients = await this.ingredientRepository.findBy({
      id: id,
    });
    if (id) {
      throw new NotFoundException('Ingredient Id is not found');
    }
    return ingredients;
  }
  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.ingredientRepository.findOneBy({ id: id });
    if (!ingredient) {
      throw new NotFoundException('ingredient not found');
    }
    Object.assign(ingredient, updateIngredientDto);
    return ingredient;
  }
  async remove(id: number) {
    const ingredient = await this.ingredientRepository.findOneBy({ id: id });
    if (!ingredient) {
      throw new NotFoundException('ingredient not found');
    }

    this.ingredientRepository.remove(ingredient);
  }
}
