import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { Role } from '../auth/roles/role.enum';
import { Roles } from '../auth/roles/roles.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @Roles(Role.Admin)
  async getAll(@Query() query: FilterUserDto) {
    if (query.id) {
      return this.userService.getUserById(query.id);
    }
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post('/')
  async create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return this.userService.update(+id, updateUser);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
