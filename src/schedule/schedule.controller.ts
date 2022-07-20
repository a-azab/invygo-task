import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('/user/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get('/user/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  findAll(@Param('id') id: number) {
    return this.scheduleService.findForUser(+id);
  }

  @Get('/my')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.User)
  findMine(@Request() req: any) {
    console.log(req);
    const id = req.user.id;
    return this.scheduleService.findForUser(+id);
  }

  @Patch('/user/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: number, @Body() updateSchedule: UpdateScheduleDto) {
    return this.scheduleService.update(+id, updateSchedule);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
