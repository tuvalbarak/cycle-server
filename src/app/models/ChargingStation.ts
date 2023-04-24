import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import User from './User';

@Table({ tableName: 'charging_stations', timestamps: true })
export default class ChargingStation extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column name: string;

  @Column lat: number;

  @Column lng: number;

  @Column provider: string;

  @Column priceDetails: string;

  @Column address: string;

  @Column city: string;

  @Column count: number;

  @Column power: number;

  @Column connectorType: string;

  @Column isPrivate: boolean;

  @Column(DataType.ARRAY(DataType.INTEGER))
  ratings: number[];

  @HasOne(() => User, {
    foreignKey: 'userId',
    constraints: false,
  })
  user: User;
}
