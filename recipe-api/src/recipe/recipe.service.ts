import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Ingredient } from './entities/ingredient.entity';
import { Recipe } from './entities/recipe.entity';
import { recipeStub } from './stubs/recipe.stub';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Recipe) private repository: Repository<Recipe>,
  ) {}
  async create(createRecipeDto: CreateRecipeDto, user: User) {
    const recipe = this.repository.create({
      title: createRecipeDto.title,
      description: createRecipeDto.description,
      time_minutes: createRecipeDto.time_minutes,
      price: createRecipeDto.price,
      ingredient: [],
    });
    recipe.user = user;
    return await this.repository.save(recipe);
  }
  async findAll() {
    return await this.repository.find();
  }
  async findOne(id: number) {
    return await this.repository.findOne({
      where: { id: id },
      relations: ['ingredient'],
    });
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.repository.findOneBy({ id: id });
    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }
    Object.assign(recipe, updateRecipeDto);
    return recipe;
  }

  async remove(id: number) {
    const recipe = await this.repository.findOneBy({ id: id });
    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }

    this.repository.remove(recipe);
  }

  async addIngredient(
    recipeid: number,
    updateIngredientDto: UpdateIngredientDto,
  ) {
    console.log(recipeid);
    const recipe = await this.findOne(recipeid);
    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }
    const ingredient = await this.ingredientRepository.create(
      updateIngredientDto,
    );
    recipe.ingredient.push(ingredient);
    return await this.repository.save(recipe);
  }

  async removeIngredient(
    recipeid: number,
    updateIngredientDto: UpdateIngredientDto,
  ) {
    const recipe = await this.findOne(recipeid);
    if (!recipe) {
      throw new NotFoundException('Ingredient Not Found');
    }
    recipe.ingredient = recipe.ingredient.filter((ingred) => {
      ingred.name !== updateIngredientDto.name;
    });
    return await this.repository.save(recipe);
  }
  async updateIngredient(
    recipeid: number,
    updateIngredientDtos: UpdateIngredientDto[],
  ) {
    const recipe = await this.findOne(recipeid);
    if (!recipe) {
      throw new NotFoundException('Ingredient Not Found');
    }
    recipe.ingredient = [];
    for (let i = 0; i < updateIngredientDtos.length; i++) {
      const ingredient = await this.ingredientRepository.create(
        updateIngredientDtos[i],
      );
      recipe.ingredient.push(ingredient);
    }
    return await this.repository.save(recipe);
  }
}
