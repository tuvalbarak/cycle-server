import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';

import User from './User';
import Comment from './Comment';

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

  @Column condition: string;

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
