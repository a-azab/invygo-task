import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Schedule) private scheduleModel: typeof Schedule) {}
  create(createScheduleDto: CreateScheduleDto | Schedule) {
    return this.scheduleModel.create({ ...createScheduleDto });
  }

  findForUser(id: number) {
    return this.scheduleModel.findAll({
      where: { user_id: id },
      include: [{ model: User }],
    });
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleModel.update(updateScheduleDto, { where: { id } });
  }

  remove(id: number) {
    return this.scheduleModel.destroy({ where: { id } });
  }
}
