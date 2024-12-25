import { Model, Table, Column, DataType } from "sequelize-typescript";

// export interface userModel {
//   id: string;
//   userName: string;
//   email: string;
// }

@Table({ tableName: "User", timestamps: true })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    // autoIncrementIdentity: true,
    autoIncrement: true,
  })
  // @PrimaryKey()
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  username!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;
}
