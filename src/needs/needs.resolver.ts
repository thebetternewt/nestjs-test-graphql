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

import { createUnionType } from 'type-graphql';
import { ChildcareDetail } from 'src/childcare-details/models/childcareDetail';
import { ChildcareDetailsService } from 'src/childcare-details/childcare-details.service';

@Resolver(of => Need)
export class NeedsResolver {
  constructor(
    private readonly needsService: NeedsService,
    private readonly usersService: UsersService,
    private readonly childcareDetailsService: ChildcareDetailsService,
  ) {}

  @ResolveProperty('needDetail')
  async needDetail(@Parent() parent) {
    console.log(parent);
    switch (parent.needType) {
      // case 'TRAVEL':
      //   return TravelNeed.findOne({ need: parent })
      // case 'LAWNCARE':
      //   return LawncareNeed.findOne({ need: parent })
      case 'CHILDCARE':
        return this.childcareDetailsService.findOne(parent);
      default:
        return null;
    }
  }

  // @ResolveProperty('__resolveType')
  // resolveType(@Parent() parent): string {
  //   switch (parent.needType) {
  //     // case 'TRAVEL':
  //     //   return 'TravelNeed';
  //     // case 'LAWNCARE':
  //     //   return 'LawncareNeed';
  //     case 'CHILDCARE':
  //       return 'ChildcareDetail';
  //     default:
  //       return '';
  //   }
  // }

  @ResolveProperty('location')
  location(@Parent() need) {
    return formatLocationOutput(need.location);
  }

  @ResolveProperty('recipient')
  async recipient(@Parent() need) {
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
