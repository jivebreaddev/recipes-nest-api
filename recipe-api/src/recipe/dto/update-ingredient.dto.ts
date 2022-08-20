import { IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdateIngredientDto {
  @IsNumber()
  @IsOptional()
  id: number;
  @IsString()
  @IsOptional()
  name: string;
}
