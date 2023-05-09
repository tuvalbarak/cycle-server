import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import User from './User';

@Table({ tableName: 'gamifications', timestamps: true })
export default class Gamification extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column description: string;

  @Column amount: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
