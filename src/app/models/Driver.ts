import { Column, Table, Model, DataType } from "sequelize-typescript";
@Table({ tableName: 'drivers', timestamps: true})
export default class Driver extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column googleId: number;

  @Column email: string;

  @Column name: string;

  @Column thumbnail: string;

  @Column phone: string;

  @Column crystalsBalance: number;

  @Column drivingCharacteristicId: number;

  @Column preferenceId: number;

  @Column(DataType.ARRAY(DataType.INTEGER)) 
  vehiclesHistory: number[];

  @Column lastVehicleUsedId: number;
}