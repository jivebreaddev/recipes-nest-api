import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { UpdateIngredientDto } from '../dto/update-ingredient.dto';
import { Ingredient } from '../entities/ingredient.entity';
import { Recipe } from '../entities/recipe.entity';
import { RecipeService } from '../recipe.service';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient) private ingredientRepository,
    private recipeService: RecipeService,
  ) {}

  async create(CreateIngredientDto, recipe) {
    const ingredient = this.ingredientRepository.create({
      ...CreateIngredientDto,
    });
    ingredient.recipe = recipe;
    return this.ingredientRepository.save(ingredient);
  }
  async findAll(id) {
    const recipe = await this.recipeService.findOne(id);
    let ingredients_id = recipe.ingredients;

    let ingredients = this.ingredientRepository.findBy({
      id: In(ingredients_id),
    });

    return ingredients;
  }

  async findOne(id: number) {
    return this.ingredientRepository.findOneBy({ id: id });
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
