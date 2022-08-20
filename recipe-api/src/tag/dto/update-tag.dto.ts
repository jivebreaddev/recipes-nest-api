import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTagDto } from './create-tag.dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsNumber()
  @IsOptional()
  id: number;
  @IsString()
  @IsOptional()
  title: string;
}
