import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';

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
      throw new BadRequestException('email in use');
    }

    const user = await this.userService.create({
      username: username,
      password: password,
    });

    return user;
  }
}
