import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user';
import { NewUserInput } from './dto/new-user.input';
import { Model } from 'mongoose';
import { UserSigninInput } from './dto/user-signin.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async create(userData: NewUserInput): Promise<User> {
    const user = await this.userModel.findOne({ email: userData.email });
    if (user) {
      throw new UnprocessableEntityException(
        'User already exists for this email.',
      );
    }
    const newUser = new this.userModel(userData);
    return await newUser.save();
  }

  async delete(id: string): Promise<boolean> {
    const deletedUser = await this.userModel.findOneAndRemove({ _id: id });

    if (!deletedUser) {
      throw new NotFoundException('User not found!');
    }

    return true;
  }

  async signIn(credentials: UserSigninInput): Promise<User> {
    const user = await this.userModel.findOne({ email: credentials.email });

    if (!user) {
      throw new UnprocessableEntityException(
        'Invalid email or password. Please try again.',
      );
    }

    return user;
  }
}
