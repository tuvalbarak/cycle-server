import {
  Column,
  Table,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import ChargingStation from './ChargingStation';
import DrivingCharacteristics from './DrivingCharacteristics';
import UserPreferances from './UserPreferances';

@Table({ tableName: 'users', timestamps: true })
export default class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column googleId: number;

  @Column email: string;

  @Column name: string;

  @Column thumbnail: string;

  @Column phone: string;

  @Column crystalsBalance: number;

  @Column(DataType.ARRAY(DataType.INTEGER))
  vehiclesHistory: number[];

  @Column lastVehicleUsedId: number;

  @ForeignKey(() => ChargingStation)
  @Column
  chargingStationId: number;

  @BelongsTo(() => ChargingStation)
  chargingStation: ChargingStation;

  @ForeignKey(() => DrivingCharacteristics)
  @Column
  drivingCharacteristicId: number;

  @ForeignKey(() => UserPreferances)
  @Column
  preferenceId: number;
}
