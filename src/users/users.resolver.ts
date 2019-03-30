import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UsersArgs } from './dto/users.args';
import { User } from './models/user';
import { NewUserInput } from './dto/new-user.input';
import { UserSigninInput } from './dto/user-signin.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(id);
    }

    return user;
  }

  @Query(returns => [User])
  async users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Mutation(returns => User)
  async signup(
    @Args('newUserData')
    newUserData: NewUserInput,
  ) {
    return await this.usersService.create(newUserData);
  }

  @Mutation(returns => User)
  async signIn(
    @Args('userSigninInput')
    credentials: UserSigninInput,
  ) {
    return await this.usersService.signIn(credentials);
  }
}
