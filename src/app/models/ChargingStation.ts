import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
  Default,
} from 'sequelize-typescript';

import User from './User';
import Comment from './Comment';

@Table({ tableName: 'charging_stations', timestamps: true })
export default class ChargingStation extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column name: string;

  @Column(DataType.FLOAT) lat: number;

  @Column(DataType.FLOAT) lng: number;

  @Column provider: string;

  @Column(DataType.TEXT)
  priceDetails: string;

  @Column address: string;

  @Column city: string;

  @Column count: number;

  @Column(DataType.FLOAT) power: number;

  @Column connectorType: string;

  @Column isPrivate: boolean;

  @Column condition: string;

  @Default([])
  @Column(DataType.ARRAY(DataType.INTEGER))
  ratings: number[];

  @HasMany(() => Comment, {
    foreignKey: 'chargingStationId',
    constraints: false,
  })
  comments: Comment[];

  @ForeignKey(() => User)
  @Column
  ownerId: number;

  @BelongsTo(() => User)
  owner: User;
}
