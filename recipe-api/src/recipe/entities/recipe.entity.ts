import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Ingredient } from './ingredient.entity';

export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  time_minutes: number;

  @Column()
  price: number;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredient: Ingredient[];
}
