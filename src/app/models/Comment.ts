import {
  Column,
  Table,
  Model,
  DataType,
  HasOne,
  ForeignKey,
  BelongsTo,
  Unique,
} from 'sequelize-typescript';
import ChargingStation from './ChargingStation';

@Table({ tableName: 'comments', timestamps: true })
export default class Comment extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column
  content: string;

  @Column
  commentator: string;

  @ForeignKey(() => ChargingStation)
  @Column
  chargingStationId: number;

  @BelongsTo(() => ChargingStation)
  chargingStation: ChargingStation;
}
