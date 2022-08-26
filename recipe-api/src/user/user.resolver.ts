import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query()
  async user() {
    return this.userService.findAll();
  }
  @Query()
  async userById(@Args('id') id: number) {
    return this.userService.findOne(id.toString());
  }
  @Mutation()
  async addNewUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.userService.create({ username: username, password: password });
  }
}
