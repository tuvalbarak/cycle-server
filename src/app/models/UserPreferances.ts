import {
  Column,
  Table,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 'user_preferances', timestamps: true })
export default class UserPreferances extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column areNotificationAllowed: boolean;

  @Column areTollRoadsAllowed: boolean;

  @Column areMultipleChargingStopsAllowed: boolean;

  @Column roadLandscape: string;
}
