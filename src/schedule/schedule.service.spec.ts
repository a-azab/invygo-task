import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from './schedule.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Schedule } from './entities/schedule.entity';
import { ConfigModule } from '@nestjs/config';

describe('ScheduleService', () => {
  let service: ScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleService],
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

    service = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
