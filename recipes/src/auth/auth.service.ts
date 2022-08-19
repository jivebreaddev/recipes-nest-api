import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(username: string, password: string) {
    const users = await this.userService.findOne(username);
    if (!users) {
      throw new NotFoundException('User Not found');
    }

    if (users.password !== password) {
      throw new BadRequestException('Bad Password');
    }

    return users;
  }

  async signUp(username: string, password: string) {
    const users = await this.userService.findOne(username);
    if (users) {
      throw new BadRequestException('username in use');
    }
    // This part is trasnferred to Validation in dto with Pipe
    if (password.length < 9) {
      throw new BadRequestException('password is too short');
    }
    const user = await this.userService.create({
      username: username,
      password: password,
    });

    return user;
  }
}
