import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private repository: Repository<Recipe>,
  ) {}
  async create(createRecipeDto: CreateRecipeDto) {
    const recipe = this.repository.create({
      title: createRecipeDto.title,
      description: createRecipeDto.description,
      time_minutes: createRecipeDto.time_minutes,
      price: createRecipeDto.price,
    });
    return this.repository.save(recipe);
  }
  async findAll() {
    return this.repository.find();
  }
  async findOne(id: number) {
    return this.repository.findOneBy({ id: id });
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
      throw new NotFoundException('user not found');
    }

    this.repository.remove(recipe);
  }
}
