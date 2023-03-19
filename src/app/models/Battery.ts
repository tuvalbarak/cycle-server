import { Column, Table, Model, DataType, ForeignKey } from "sequelize-typescript";
import ElectricVehicle from "./ElectricVehicle";
import VehicleMeta from "./VehiclesMeta";


@Table({ tableName: 'batteries', timestamps: true})
export default class Battery extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column rangeCapacity: number;

  @Column batteryCapacity: number;

  @Column consumptionPerKm: number;

  @Column percentage: number;
}