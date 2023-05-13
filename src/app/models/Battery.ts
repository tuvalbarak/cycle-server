import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';

@Table({ tableName: 'batteries', timestamps: true })
export default class Battery extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column rangeCapacity: number;

  @Column batteryCapacity: number;

  @Column consumptionPerKm: number;

  @Column percentage: number;
}
