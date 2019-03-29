import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { BookSchema } from './schemas/book.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  controllers: [BooksController],
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
