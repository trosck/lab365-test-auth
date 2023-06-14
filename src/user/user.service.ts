import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(password: string) {
    return this.userModel.create({ password });
  }

  async getUserById(id: string) {
    return this.userModel.findById(id);
  }
}
