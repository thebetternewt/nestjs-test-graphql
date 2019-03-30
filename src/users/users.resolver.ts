import { NotFoundException } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewUserInput } from './dto/new-user.input';
import { UserSigninInput } from './dto/user-signin.input';
import { UserInput } from './dto/user.input';
import { UsersArgs } from './dto/users.args';
import { User } from './models/user';
import { UsersService } from './users.service';

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
  async users(
    @Args() usersArgs: UsersArgs,
    @Context() { req },
  ): Promise<User[]> {
    console.log(req.session);
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
    @Context() { req },
  ) {
    console.log('bf signin:', req.session);

    const user = await this.usersService.signIn(credentials);

    req.session.userId = user.id;
    // req.session.isAdmin = user.admin

    console.log('af signin:', req.session);
    return user;
  }

  @Mutation(returns => User)
  async updateUser(
    @Args('userInput')
    userInput: UserInput,
  ) {
    return await this.usersService.update(userInput);
  }
}
