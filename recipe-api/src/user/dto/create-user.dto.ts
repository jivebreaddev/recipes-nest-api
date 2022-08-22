import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string;
  // 8 letters or 400 bad request using pipe
  @Matches('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$')
  @ApiProperty()
  @IsString()
  password: string;
}
