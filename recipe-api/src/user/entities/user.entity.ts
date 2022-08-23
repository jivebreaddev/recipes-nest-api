import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Recipe, (recipe) => recipe.user, {
    cascade: true,
  })
  recipe: Recipe[];
}
