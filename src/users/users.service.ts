import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { ConfigService } from 'src/config/config.service';
import { NewUserInput } from './dto/new-user.input';
import { UserSignInInput } from './dto/user-signin.input';
import { UserInput } from './dto/user.input';
import { User } from './models/user';

@Injectable()
export class UsersService {
  private sessionName: string;
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    config: ConfigService,
  ) {
    this.sessionName = config.get('SESS_NAME');
  }

  private confirmPassword = (password: string, confirm: string) =>
    password && password === confirm;

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async create(userData: NewUserInput): Promise<User> {
    const user = await this.userModel.findOne({ email: userData.email });

    // Check if user already exists.
    if (user) {
      throw new UnprocessableEntityException(
        'User already exists for this email.',
      );
    }

    // Verify password and confirmPassword match.
    if (!this.confirmPassword(userData.password, userData.confirmPassword)) {
      throw new UnprocessableEntityException('Passwords do not match.');
    }

    const newUser = new this.userModel(userData);

    return await newUser.save();
  }

  async update({ id, ...userData }: UserInput): Promise<User> {
    console.log(userData);
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User does not exist.');
    }

    if (userData.password) {
      // Verify password and confirmPassword match.
      if (!this.confirmPassword(userData.password, userData.confirmPassword)) {
        throw new UnprocessableEntityException('Passwords do not match.');
      }
    }

    const updatedUser = user.set(userData);
    console.log(updatedUser);
    return await updatedUser.save();
  }

  async delete(id: string): Promise<boolean> {
    const deletedUser = await this.userModel.findOneAndRemove({ _id: id });

    if (!deletedUser) {
      throw new NotFoundException('User not found!');
    }

    return true;
  }

  async signIn(
    { email, password }: UserSignInInput,
    req: Request,
  ): Promise<User> {
    const user = await this.userModel.findOne({ email });

    // Verify user's passowrd
    if (!user || !(await user.matchesPassword(password))) {
      throw new UnprocessableEntityException(
        'Invalid email or password. Please try again.',
      );
    }

    req.session.userId = user.id;

    return user;
  }

  async signOut(req: Request, res: Response): Promise<boolean> {
    return new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if (err) reject(err);

        // Delete cookie from session
        res.clearCookie(this.sessionName);

        resolve(true);
      });
    });
  }
}
