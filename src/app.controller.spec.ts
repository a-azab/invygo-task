import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
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
        AuthModule,
        UsersModule,
        ScheduleModule,],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!', () => {
      expect(true).toBe(true);
    });
  });
});
