import { Column, Table, Model, DataType, HasOne, HasMany, Unique } from "sequelize-typescript";

import Battery from "./Battery";
import ElectricVehicle from "./ElectricVehicle";


@Table({ tableName: 'vehicles_meta', timestamps: true})
export default class VehicleMeta extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @HasOne(() => Battery, { sourceKey: "manufactureBatteryId", foreignKey: 'id' })
  manufactureBattery: Battery

  @Unique
  @Column manufactureBatteryId: number;

  @Column brand: string;

  @Column model: string;

  @Column image: string;

  @Column year: number;    

  @HasMany(() => ElectricVehicle, {
    foreignKey: "vehicleMetaId",
    constraints: false
  })
  vehicles: ElectricVehicle[];

}