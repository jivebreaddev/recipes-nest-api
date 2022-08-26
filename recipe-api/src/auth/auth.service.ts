import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new NotFoundException('User Not found');
    }

    if (user.password !== password) {
      throw new BadRequestException('Bad Password');
    }
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async signIn(user: any) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
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
