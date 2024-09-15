import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { UserDetails } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      favourites: user.favourites,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async create(
    username: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async update(id: string, newFavourites: string[]): Promise<UserDetails> {
    const existingUser = await this.userModel.findById(id);
    existingUser.favourites = newFavourites ?? existingUser.favourites;

    const newUser = await existingUser.save();
    return this._getUserDetails(newUser);
  }
}
