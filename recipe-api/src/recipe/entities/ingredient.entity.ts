import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';
@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: Number;
  @Column()
  name: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredient)
  recipe: Recipe;
}
