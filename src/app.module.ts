import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { ScheduleModule } from './schedule/schedule.module';
import { ConfigModule } from '@nestjs/config';
import { Schedule } from './schedule/entities/schedule.entity';

@Module({
  imports: [
    // Initialize sequelize module (MySQL)
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'invygo',
      password: process.env.DB_PASSWORD || 'invygo',
      database: process.env.DB_NAME || 'invygo',
      models: [User, Schedule],
      // autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ScheduleModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
