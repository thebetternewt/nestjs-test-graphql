import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NeedsResolver } from './needs.resolver';
import { NeedsService } from './needs.service';
import { NeedSchema } from './schemas/need.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Need', schema: NeedSchema }])],
  providers: [NeedsResolver, NeedsService],
})
export class NeedsModule {}
