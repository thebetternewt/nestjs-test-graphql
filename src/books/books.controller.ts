import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { Book } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    return await this.booksService.findAll();
  }

  @Get(':bookId')
  async getBook(@Param('bookId') bookId: string): Promise<Book> {
    return await this.booksService.findOne(bookId);
  }

  @Post()
  async addBook(@Body() createBookDTO: CreateBookDTO): Promise<Book> {
    console.log(createBookDTO);
    return await this.booksService.create(createBookDTO);
  }

  @Delete(':bookId')
  async deleteBook(@Param('bookId') id: string): Promise<boolean> {
    console.log('bookId:', id);
    return await this.booksService.delete(id);
  }
}
