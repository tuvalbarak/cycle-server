import {
  Column,
  Table,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 'driving_characteristics', timestamps: true })
export default class DrivingCharacteristics extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column breakesUsageAverage: number;

  @Column speedAverage: number;

  @Column airConditionsAverage: number;
}
