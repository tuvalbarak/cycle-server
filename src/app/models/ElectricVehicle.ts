import { Column, Table, Model, DataType, HasOne, ForeignKey, BelongsTo, Unique } from "sequelize-typescript";

import Battery from "./Battery";
import VehicleMeta from "./VehiclesMeta";


@Table({ tableName: 'electric_vehicles', timestamps: true})
export default class ElectricVehicle extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @HasOne(() => Battery, { foreignKey: "electricVehicleId", constraints: false })
  currentBattery: Battery

  @ForeignKey(() => VehicleMeta)
  @Column vehicleMetaId: number;

  @BelongsTo(() => VehicleMeta)
  vehicleMeta: VehicleMeta
  

}