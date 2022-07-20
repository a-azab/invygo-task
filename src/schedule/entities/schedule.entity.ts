import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../users/user.model';

@Table({ tableName: 'schedules' })
export class Schedule extends Model {
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  date: Date;

  @Column
  hours: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
