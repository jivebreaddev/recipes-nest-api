import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
