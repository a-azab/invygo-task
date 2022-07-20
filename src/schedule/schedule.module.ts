import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Schedule } from './entities/schedule.entity';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
  imports: [SequelizeModule.forFeature([Schedule])],
})
export class ScheduleModule {}
