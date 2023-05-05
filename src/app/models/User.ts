import {
  Column,
  Table,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import ChargingStation from './ChargingStation';
import DrivingCharacteristic from './DrivingCharacteristic';
import UserPreferance from './UserPreferance';

@Table({ tableName: 'users', timestamps: true })
export default class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column googleId: string;

  @Column email: string;

  @Column name: string;

  @Column thumbnail: string;

  @Column phone: string;

  @Column crystalsBalance: number;

  @Column(DataType.ARRAY(DataType.INTEGER))
  vehiclesHistory: number[];

  @Column lastVehicleUsedId: number;

  @HasOne(() => UserPreferance, {
    foreignKey: 'userId',
    constraints: false,
  })
  preference: UserPreferance;

  @HasOne(() => DrivingCharacteristic, {
    foreignKey: 'driverId',
    constraints: false,
  })
  drivingCharacteristic: DrivingCharacteristic;

  @HasOne(() => ChargingStation, {
    foreignKey: 'ownerId',
    constraints: false,
  })
  station: ChargingStation;
}
