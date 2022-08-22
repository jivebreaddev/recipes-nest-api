import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { IngredientService } from './ingredient/ingredient.service';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { CreateIngredientDto } from './dto/create-ingredient.dto';

@Controller('recipe')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private ingredientService: IngredientService,
  ) {}
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }
  @Get()
  findAll() {
    return this.recipeService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }

  @Patch(':id/ingredient')
  create_ingredient(
    @Param('id') id: string,
    @Body() createIngredientDto: CreateIngredientDto,
  ) {
    return this.recipeService.addIngredient(+id, createIngredientDto);
  }
  @Get('/ingredient')
  findAll_ingredient() {
    return this.ingredientService.findAll();
  }

  @Delete(':id/ingredient')
  update_ingredient(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.recipeService.removeIngredient(+id, updateIngredientDto);
  }
  @Patch(':id/ingredient')
  remove_ingredient(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto[],
  ) {
    return this.recipeService.updateIngredient(+id, updateIngredientDto);
  }
}
