import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { userStub } from '../user/stubs/user.stub';
import { Ingredient } from './entities/ingredient.entity';
import { Recipe } from './entities/recipe.entity';
import { RecipeService } from './recipe.service';
import { UpdateIngredientStub } from './stubs/ingredient.stub';
import { CreateIngredientStub } from './stubs/ingredients.update.stub';
import { recipeStub } from './stubs/recipe.stub';
import { updatedRecipeStub } from './stubs/recipe.updated.stub';

describe('RecipeService', () => {
  let service: RecipeService;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn().mockImplementation((CreateRecipeDto) => {
        return CreateRecipeDto;
      }),
      save: jest.fn().mockImplementation((Recipe) => {
        return Promise.resolve({ id: 5, ...Recipe });
      }),
      find: jest.fn().mockImplementation(() => {
        return Promise.resolve([recipeStub(), recipeStub()]);
      }),
      findOne: jest.fn().mockImplementation((find_option) => {
        return Promise.resolve(recipeStub());
      }),
      findOneBy: jest.fn().mockImplementation((find_option) => {
        return Promise.resolve(recipeStub());
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        { provide: getRepositoryToken(Recipe), useValue: mockRepository },
        { provide: getRepositoryToken(Ingredient), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
  });

  it('Recipe create', async () => {
    let dto = recipeStub();
    const recipe = await service.create(dto, userStub() as User);

    expect(service).toBeDefined();
    expect(recipe.id).toEqual(dto.id);
    expect(recipe.title).toEqual(dto.title);
  });
  it('Recipe findAll', async () => {
    const recipe = await service.findAll();

    expect(service).toBeDefined();
    expect(recipe.length).toEqual(2);
    expect(recipe[0].id).toEqual(recipeStub().id);
  });
  it('Recipe findOne', async () => {
    const recipe = await service.findOne(recipeStub().id);

    expect(service).toBeDefined();
    expect(recipe.id).toEqual(recipeStub().id);
  });
  it('Recipe update', async () => {
    const recipe = await service.update(recipeStub().id, updatedRecipeStub());
    expect(service).toBeDefined();
    expect(recipe.id).toEqual(updatedRecipeStub().id);
  });
  it('Recipe addIngredient', async () => {
    let dto = recipeStub();
    const ingredient = UpdateIngredientStub();
    const recipe = await service.create(dto, userStub() as User);
    const recipe_added = await service.addIngredient(+recipe.id, ingredient);

    expect(service).toBeDefined();
    expect(recipe_added.ingredient).toHaveLength(1);
  });
  it('Recipe removeIngredient', async () => {
    let dto = recipeStub();
    const ingredient = UpdateIngredientStub();
    const recipe = await service.create(dto, userStub() as User);

    const recipe_added = await service.addIngredient(recipe.id, ingredient);

    expect(service).toBeDefined();
    expect(recipe_added.ingredient).toHaveLength(1);

    const recipe_removed = await service.removeIngredient(
      +recipe.id,
      ingredient,
    );
    expect(recipe_removed.ingredient).toHaveLength(0);
  });
  it('Recipe updateIngredient', async () => {
    let dto = recipeStub();
    const ingredient = UpdateIngredientStub();
    const recipe = await service.create(dto, userStub() as User);
    const recipe_added = await service.addIngredient(+recipe.id, ingredient);
    expect(service).toBeDefined();
    console.log(recipe.ingredient);
    expect(recipe_added.ingredient).toHaveLength(1);
    const recipe_removed = await service.removeIngredient(
      +recipe.id,
      ingredient,
    );
    expect(recipe_removed.ingredient).toHaveLength(0);
    const recipe_updated = await service.updateIngredient(+recipe.id, [
      ingredient,
      ingredient,
    ]);
    expect(recipe_updated.ingredient).toHaveLength(2);
  });
});
