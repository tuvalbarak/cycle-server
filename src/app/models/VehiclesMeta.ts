import {
  Column,
  Table,
  Model,
  DataType,
  HasOne,
  HasMany,
  Unique,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import Battery from './Battery';
import ElectricVehicle from './ElectricVehicle';

@Table({ tableName: 'vehicles_meta', timestamps: true })
export default class VehicleMeta extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @BelongsTo(() => Battery)
  battery: Battery;

  @ForeignKey(() => Battery)
  @Column
  manufactureBatteryId: number;

  @Column brand: string;

  @Column model: string;

  @Column image: string;

  @Column year: number;

  @HasMany(() => ElectricVehicle, {
    foreignKey: 'vehicleMetaId',
    constraints: false,
  })
  vehicles: ElectricVehicle[];
}
