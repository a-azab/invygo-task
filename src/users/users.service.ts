import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async create(user: User): Promise<User> {
    const salt = 10;
    const password = user.password;
    user.password = await bcrypt.hash(password, salt);
    return this.userModel.create({
      ...user,
    });
  }
}
