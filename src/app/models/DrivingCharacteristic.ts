import {
  Column,
  Table,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import User from './User';

@Table({ tableName: 'driving_characteristics', timestamps: true })
export default class DrivingCharacteristic extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column breakesUsageAverage: number;

  @Column speedAverage: number;

  @Column airConditionsAverage: number;

  @ForeignKey(() => User)
  @Column
  driverId: number;

  @BelongsTo(() => User)
  driver: User;
}
