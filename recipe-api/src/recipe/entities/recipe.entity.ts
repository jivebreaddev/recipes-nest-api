import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
