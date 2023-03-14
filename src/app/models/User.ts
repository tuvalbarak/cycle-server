import { Column, Table, Model } from "sequelize-typescript";

@Table({ tableName: 'users'})
export default class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true }) id: number;

  @Column email: string;

  @Column firstName: string;

  @Column lastName: string;

  @Column username: string;

  @Column password: string;
}