import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
} from 'sequelize-typescript';
import { Schedule } from '../schedule/entities/schedule.entity';
import { Role } from '../auth/roles/role.enum';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column
  name: string;

  @Column
  email: number;

  @Column
  password: string;

  @Column({ defaultValue: 1 })
  role: Role;

  @HasMany(() => Schedule)
  schedule: Schedule[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
