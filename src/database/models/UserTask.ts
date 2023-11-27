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
  ForeignKey,
} from "sequelize-typescript";
import { HashString } from "../../helpers";
import TaskModel from "./Task";
import UserModel from "./User";

/**
 * Sequelize model
 * @export
 * @class User
 * @extends {Model<UserTask>}
 */

@Table
class UserTask extends Model {

  @ForeignKey(() => UserModel)
  @Column
  userId!: number;

  @ForeignKey(() => TaskModel)
  @Column
  taskId!: number;
}

export default UserTask;
