import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { formatLocationOutput } from 'src/utils/locations';
import { NewNeedInput } from './dto/new-need.input';
import { Need } from './models/need';
import { NeedsService } from './needs.service';

@Resolver(of => Need)
export class NeedsResolver {
  constructor(private readonly needsService: NeedsService) {}

  @ResolveProperty()
  location(@Parent() need) {
    return formatLocationOutput(need.location);
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
