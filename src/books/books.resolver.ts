import { NotFoundException } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { Arg, Args } from 'type-graphql';
import { BooksService } from './books.service';
import { BooksArgs } from './dto/books.args';
import { Book } from './models/book';

@Resolver()
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(returns => Book)
  async book(@Arg('id') id: string): Promise<Book> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException(id);
    }

    return book;
  }

  @Query(returns => [Book])
  async books(@Args() booksArgs: BooksArgs): Promise<Book[]> {
    return await this.booksService.findAll();
  }
}
