import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { Schedule } from '../schedule/entities/schedule.entity';
import { Sequelize } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({
      raw: true,
      where: {
        email,
      },
    });
  }

  async create(user: User | CreateUserDto): Promise<User> {
    const salt = 10;
    const password = user.password;
    user.password = await bcrypt.hash(password, salt);
    return this.userModel.create({
      ...user,
    });
  }

  async getAll(): Promise<User[]> {
    return this.userModel.findAll({
      include: {
        model: Schedule,
        attributes: [],
      },
      attributes: [
        'id',
        'name',
        'email',
        [Sequelize.fn('SUM', Sequelize.col('schedule.hours')), 'TotalWorkedHours'],
      ],
    });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.userModel.findOne({
      where: {
        id,
      },
      include: Schedule,
      attributes: {
        exclude: ['password'],
      },
    });
  }

  async update(id: number, updateScheduleDto: UpdateUserDto) {
    return this.userModel.update(updateScheduleDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    return this.userModel.destroy({
      where: {
        id,
      },
    });
  }
}
