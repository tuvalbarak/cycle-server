import { Column, Table, Model, BelongsToMany, DataType } from "sequelize-typescript";


@Table({ tableName: 'drivers'})
export default class Driver extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column email: string;

  @Column name: string;

  @Column thumbnail: string;

  @Column phone: string;

  @Column crystalsBalance: number;

  @Column drivingCharacteristicId: number;

  @Column preferenceId: number;

  // @Column(DataType.ARRAY(DataType.NUMBER)) 
  // vehiclesHistory: number[];

  // @BelongsToMany(() => ElectricVehicle, {
  //   through: { model: () => DriverVehicle },
  //   foreignKey: "driverId", 
  //   otherKey: "electricVehicleId",
  //   constraints: false
  // })
  // vehicles: DriverVehicle[];
}