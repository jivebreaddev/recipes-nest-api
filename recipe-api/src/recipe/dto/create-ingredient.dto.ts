import { IsNumber, IsString } from 'class-validator';
export class CreateIngredientDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
}
