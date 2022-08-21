import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Recipe } from './recipe.entity';

export class Ingredient {
  @Column()
  name: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredient, {
    cascade: true,
  })
  recipe: Recipe;
}
