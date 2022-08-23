import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientService } from './ingredient/ingredient.service';
import { Ingredient } from './entities/ingredient.entity';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Ingredient]), UserModule],
  controllers: [RecipeController],
  providers: [RecipeService, IngredientService],
})
export class RecipeModule {}
