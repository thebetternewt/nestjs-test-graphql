import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ChildcareDetailsService } from './childcare-details.service';
import { NeedsService } from 'src/needs/needs.service';
import { ChildcareDetail } from './models/childcareDetail';

@Resolver(of => ChildcareDetail)
export class ChildcareDetailResolver {
  constructor(
    // @Inject(forwardRef(() => NeedsService))
    private readonly childcareDetailsService: ChildcareDetailsService,
    private readonly needsService: NeedsService,
  ) {}

  @ResolveProperty('need')
  async need(@Parent() parent) {
    console.log(parent);
    return await this.needsService.findOne(parent.need);
  }

  // @Mutation(returns => ChildcareDetail)
  // async createChildcareDetail(
  //   @Args('newChildcareDetailData')
  //   newChildcareData: NewChildcareDetailInput,
  //   @Context() { req },
  // ) {
  //   return await this.childcareDetailsService.create(newChildcareData);
  // }
}
