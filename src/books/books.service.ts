import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDTO } from './dto/create-book.dto';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find();
  }

  async findOne(id: string): Promise<Book> {
    return await this.bookModel.findById(id);
  }

  async create(createBookDto: CreateBookDTO): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    return await newBook.save();
  }

  async delete(id: string): Promise<boolean> {
    const deletedBook = await this.bookModel.findOneAndRemove({ _id: id });

    if (!deletedBook) {
      throw new HttpException('Book not found!', 404);
    }

    return true;
  }
}
