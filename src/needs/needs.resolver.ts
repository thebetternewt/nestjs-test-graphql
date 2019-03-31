import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { formatLocationOutput } from '../utils/locations';
import { NewNeedInput } from './dto/new-need.input';
import { Need } from './models/need';
import { NeedsService } from './needs.service';
import { UsersService } from 'src/users/users.service';

@Resolver(of => Need)
export class NeedsResolver {
  constructor(
    private readonly needsService: NeedsService,
    private readonly usersService: UsersService,
  ) {}

  @ResolveProperty('location')
  location(@Parent() need) {
    console.log(need);
    return formatLocationOutput(need.location);
  }

  @ResolveProperty('recipient')
  async recipient(@Parent() need) {
    console.log(need);
    return await this.usersService.findOne(need.recipient);
  }

  @Query(returns => [Need])
  async getNeeds(
    // @Args() usersArgs: UsersArgs,
    @Context() { req },
  ): Promise<Need[]> {
    return await this.needsService.findAll();
  }

  @Mutation(returns => Need)
  async createNeed(
    @Args('newNeedData')
    newNeedData: NewNeedInput,
    @Context() { req },
  ) {
    return await this.needsService.create(newNeedData, req);
  }
}
