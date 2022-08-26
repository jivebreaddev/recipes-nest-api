import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from './recipe.entity';
@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredient)
  recipe: Recipe;
}
