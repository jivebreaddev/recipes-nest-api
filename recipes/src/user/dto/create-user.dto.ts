import { IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  // 8 letters or 400 bad request using pipe
  @Matches('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$')
  @IsString()
  password: string;
}
