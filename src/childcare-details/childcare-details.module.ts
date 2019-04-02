import { Module, forwardRef } from '@nestjs/common';
import { ChildcareDetailsService } from './childcare-details.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChildcareDetailSchema } from './schemas/childcareDetail.schema';
import { ChildcareDetailResolver } from './childcare-details.resolver';
import { NeedsModule } from 'src/needs/needs.module';
import { NeedsService } from 'src/needs/needs.service';

//! TODO: Solve circular dependency problem!
//! https://docs.nestjs.com/fundamentals/circular-dependency

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ChildcareDetail', schema: ChildcareDetailSchema },
    ]),
    forwardRef(() => NeedsModule),
  ],
  providers: [ChildcareDetailsService, ChildcareDetailResolver, NeedsService],
})
export class ChildcareDetailsModule {}
