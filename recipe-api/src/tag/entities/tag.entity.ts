import { PrimaryGeneratedColumn } from 'typeorm';

export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @IsColumn()
  title: string;
}
