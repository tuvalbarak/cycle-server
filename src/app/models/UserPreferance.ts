import {
  Column,
  Table,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import User from './User';

export enum Landscape {
  NATURE = 'Nature',
  FARMS = 'Farms',
  URBAN = 'Urban',
}

@Table({ tableName: 'user_preferances', timestamps: true })
export default class UserPreferance extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column areNotificationAllowed: boolean;

  @Column areTollRoadsAllowed: boolean;

  @Column areMultipleChargingStopsAllowed: boolean;

  @Column roadLandscape: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
