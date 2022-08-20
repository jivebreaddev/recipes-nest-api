import { Ingredient } from '../entities/ingredient.entity';

export const updatedRecipeStub = (): Ingredient => {
  return {
    id: 5,
    name: 'updated',
  };
};
