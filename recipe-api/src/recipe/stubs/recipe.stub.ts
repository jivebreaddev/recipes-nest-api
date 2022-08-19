import { Recipe } from '../entities/recipe.entity';

export const recipeStub = (): Recipe => {
  return {
    id: 5,
    title: 'sdsadaflkjasd',
    description: 'sadfasdfsad',
    time_minutes: 234,
    price: 3214,
  };
};
