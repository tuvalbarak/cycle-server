import { Column, Table, Model, DataType, HasOne, HasMany } from "sequelize-typescript";

import Battery from "./Battery";
import ElectricVehicle from "./ElectricVehicle";


@Table({ tableName: 'vehicles_meta'})
export default class VehicleMeta extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @HasOne(() => Battery, { foreignKey: "vehicleMetaId", constraints: false })
  manufactureBattery: Battery

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