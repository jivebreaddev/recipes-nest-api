import { Recipe } from '../entities/recipe.entity';

export const updatedRecipeStub = (): Recipe => {
  return {
    id: 5,
    title: 'updated',
    description: 'updated',
    time_minutes: 234,
    price: 3214,
  };
};
