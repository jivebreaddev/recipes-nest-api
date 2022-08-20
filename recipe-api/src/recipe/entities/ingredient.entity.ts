import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
