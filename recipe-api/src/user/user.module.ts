import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Recipe])],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService],
  exports: [UserService],
})
export class UserModule {}
