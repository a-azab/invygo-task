import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Schedule } from './entities/schedule.entity';

describe('ScheduleController', () => {
  let controller: ScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [ScheduleService],
      exports: [ScheduleService],
      imports: [
        ConfigModule.forRoot(),
        // Initialize sequelize module (MySQL)
        SequelizeModule.forRoot({
          dialect: 'mysql',
          host: process.env.DB_HOST || 'localhost',
          port: Number(process.env.DB_PORT) || 3306,
          username: process.env.DB_USER || 'invygo',
          password: process.env.DB_PASSWORD || 'invygo',
          database: process.env.DB_NAME || 'invygo',
          // models: [User, Schedule],
          // autoLoadModels: true,
          synchronize: true,
        }),
        SequelizeModule.forFeature([Schedule]),
      ],
    }).compile();

    controller = module.get<ScheduleController>(ScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
