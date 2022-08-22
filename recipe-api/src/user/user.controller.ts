import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  findOne(@Param('username') username: string) {
    const user = this.userService.findOne(username);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(username, updateUserDto);
  }

  @Post('signup')
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body.username, body.password);
    return user;
  }
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }
}
