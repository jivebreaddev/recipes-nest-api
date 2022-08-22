import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { UpdateIngredientDto } from '../dto/update-ingredient.dto';
import { Ingredient } from '../entities/ingredient.entity';
import { UpdateIngredientStub } from '../stubs/ingredient.stub';
import { CreateIngredientStub } from '../stubs/ingredients.update.stub';
import { recipeStub } from '../stubs/recipe.stub';
import { IngredientService } from './ingredient.service';

describe('IngredientService', () => {
  let service: IngredientService;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn().mockImplementation((createIngredientDto) => {
        return createIngredientDto;
      }),
      save: jest.fn().mockImplementation((Ingredient) => {
        return Promise.resolve({ ...Ingredient });
      }),
      find: jest.fn().mockImplementation(() => {
        return Promise.resolve([
          CreateIngredientStub(),
          CreateIngredientStub(),
        ]);
      }),
      findOne: jest.fn().mockImplementation((dto) => {
        return Promise.resolve(dto);
      }),
      findBy: jest.fn().mockImplementation((dto) => {
        return Promise.resolve(dto);
      }),
      findOneBy: jest.fn().mockImplementation((dto) => {
        return Promise.resolve(dto);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientService,
        { provide: getRepositoryToken(Ingredient), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<IngredientService>(IngredientService);
  });

  it('Ingredient create', async () => {
    let dto = CreateIngredientStub();
    const sample_recipe = recipeStub();
    const ingredient = await service.create(dto, sample_recipe.id);

    expect(service).toBeDefined();
    expect(ingredient.name).toEqual(dto.name);
  });
  it('Ingredient findAll', async () => {
    const ingredient = await service.findAll();

    expect(service).toBeDefined();
    expect(ingredient.length).toEqual(2);
    expect(ingredient[0].name).toEqual(CreateIngredientStub().name);
  });
  it('Ingredient findOne', async () => {
    const ingredient = await service.findOne(CreateIngredientStub().name);

    expect(service).toBeDefined();
    expect(ingredient.name).toEqual(CreateIngredientStub().name);
  });
  it('Ingredient update', async () => {
    const recipe = await service.update(
      UpdateIngredientStub().name,
      UpdateIngredientStub(),
    );
    expect(service).toBeDefined();
    expect(recipe.name).toEqual(UpdateIngredientStub().name);
  });
});
