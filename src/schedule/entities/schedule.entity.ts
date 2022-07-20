import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

@Table({ tableName: 'schedules' })
export class Schedule extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  date: Date;

  @Column
  hours: number;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
