import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipeService } from './recipe.service';
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
        return Promise.resolve({ id: 2, ...Recipe });
      }),
      find: jest.fn().mockImplementation(() => {
        return Promise.resolve([recipeStub(), recipeStub()]);
      }),
      findOneBy: jest.fn().mockImplementation((id) => {
        return Promise.resolve(recipeStub());
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        { provide: getRepositoryToken(Recipe), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
  });

  it('Recipe create', async () => {
    let dto = recipeStub();
    const recipe = await service.create(dto);

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
});
