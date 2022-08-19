import { IsNumber, IsString, IsOptional } from 'class-validator';
export class CreateRecipeDto {
  @IsNumber()
  id: number;
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsNumber()
  time_minutes: number;
  @IsNumber()
  price: number;
}
