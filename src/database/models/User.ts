/* eslint-disable import/no-cycle */
import { UUIDV4 } from "sequelize";
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  Sequelize,
  DataType,
  BeforeCreate,
  BelongsToMany,
  BeforeUpdate,
  AllowNull,
} from "sequelize-typescript";
import { HashString } from "../../helpers";
import TaskModel from "./Task";
import UserTask from "./UserTask";

/**
 * Sequelize model
 * @export
 * @class User
 * @extends {Model<UserModel>}
 */
@Table({
  tableName: "Users",
  modelName: "UserModel",
})
class UserModel extends Model {
  @Default(UUIDV4())
  @PrimaryKey
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  firstName!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  position!: string;

  @CreatedAt
  @Default(Sequelize.fn("NOW"))
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Default(Sequelize.fn("NOW"))
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BelongsToMany(() => TaskModel, () => UserTask)
  tasks!: TaskModel[];

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: UserModel) {
    if (instance.changed("password")) {
      instance.password = await HashString(instance.password);
    }
  }
}

export default UserModel;
