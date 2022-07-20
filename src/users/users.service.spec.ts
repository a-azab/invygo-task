import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.model';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
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
        SequelizeModule.forFeature([User]),
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
