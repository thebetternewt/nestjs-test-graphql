import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { NewUserInput } from './dto/new-user.input';
import { UserSignInInput } from './dto/user-signin.input';
import { UserInput } from './dto/user.input';
import { UsersArgs } from './dto/users.args';
import { User } from './models/user';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveProperty('fullName')
  location(@Parent() need): string {
    console.log(need);
    return `${need.firstName} ${need.lastName}`;
  }

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
  async signUp(
    @Args('newUserData')
    newUserData: NewUserInput,
  ) {
    return await this.usersService.create(newUserData);
  }

  @Mutation(returns => User)
  async signIn(
    @Args('userSigninInput')
    credentials: UserSignInInput,
    @Context() { req },
  ) {
    return await this.usersService.signIn(credentials, req);
  }

  @Mutation(returns => Boolean)
  async signOut(@Context() { req, res }) {
    return await this.usersService.signOut(req, res);
  }

  @Mutation(returns => User)
  async updateUser(
    @Args('userInput')
    userInput: UserInput,
  ) {
    return await this.usersService.update(userInput);
  }
}
