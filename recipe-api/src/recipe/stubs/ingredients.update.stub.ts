import { Ingredient } from '../entities/ingredient.entity';

export const updatedIngredientStub = (): Ingredient => {
  return {
    id: 5,
    name: 'asfddsadsa',
    recipe: [3],
  };
};
