import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './user.controller';
import { User } from './user.model';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
