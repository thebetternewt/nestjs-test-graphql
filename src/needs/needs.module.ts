import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NeedsResolver } from './needs.resolver';
import { NeedsService } from './needs.service';
import { NeedSchema } from './schemas/need.schema';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from 'src/config/config.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Need', schema: NeedSchema }]),
    UsersModule,
    ConfigModule,
  ],
  providers: [NeedsResolver, NeedsService, UsersService],
})
export class NeedsModule {}
