import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/user/entities/user.entity';

import { userStub } from '../user/stubs/user.stub';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { IngredientService } from './ingredient/ingredient.service';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { recipeStub } from './stubs/recipe.stub';
import { updatedRecipeStub } from './stubs/recipe.updated.stub';
import { UserService } from '../user/user.service';
describe('RecipeController', () => {
  let controller: RecipeController;
  let fakeRecipeService: Partial<RecipeService>;
  let fakeUserService: Partial<UserService>;
  let stub: CreateRecipeDto;
  beforeEach(async () => {
    fakeRecipeService = {
      create: (createRecipeDto: CreateRecipeDto, user: User) => {
        return Promise.resolve(createRecipeDto as Recipe);
      },
      findOne: (id: number) => {
        return Promise.resolve(recipeStub() as Recipe);
      },
      findAll: () => {
        return Promise.resolve([recipeStub(), recipeStub()] as Recipe[]);
      },
      update: (id: number, updateUserDto: UpdateRecipeDto) => {
        const recipe = recipeStub();
        Object.assign(recipe, updateUserDto);
        return Promise.resolve(recipe as Recipe);
      },
      remove: (id: number) => {
        return Promise.resolve();
      },
    };
    fakeUserService = {
      findOne: (username: string) => {
        return Promise.resolve(userStub() as User);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        { provide: RecipeService, useValue: fakeRecipeService },
        { provide: IngredientService, useValue: fakeRecipeService },
        { provide: UserService, useValue: fakeUserService },
      ],
    }).compile();

    controller = module.get<RecipeController>(RecipeController);
    stub = recipeStub();
  });
  it('create Recipe POST /recipe', async () => {
    const recipe = await controller.create(
      recipeStub(),
      userStub().id.toString(),
    );
    expect(recipe.id).toEqual(stub.id);
  });

  it('findOne Recipe GET /recipe/:id', async () => {
    const recipe = await controller.findOne(stub.id.toString());

    expect(recipe.id).toEqual(stub.id);
  });

  it('findAll Recipe GET /recipe', async () => {
    const recipes = await controller.findAll();
    expect(recipes.length).toEqual(2);
  });
  it('update Recipe POST /recipe', async () => {
    let stub = updatedRecipeStub();
    const recipe = await controller.update(
      updatedRecipeStub().id.toString(),
      stub,
    );

    expect(recipe).toBeDefined();
    expect(recipe.id).toEqual(updatedRecipeStub().id);
  });
});
