import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NeedsResolver } from './needs.resolver';
import { NeedsService } from './needs.service';
import { NeedSchema } from './schemas/need.schema';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ChildcareDetailsModule } from 'src/childcare-details/childcare-details.module';
import { ChildcareDetailsService } from 'src/childcare-details/childcare-details.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Need', schema: NeedSchema }]),
    UsersModule,
    ChildcareDetailsModule,
  ],
  providers: [
    NeedsResolver,
    NeedsService,
    UsersService,
    ChildcareDetailsService,
  ],
})
export class NeedsModule {}
