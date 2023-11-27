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
import UserModel from "./User";
import UserTask from "./UserTask";

/**
 * Sequelize model
 * @export
 * @class User
 * @extends {Model<TaskModel>}
 */

 const priorityTypes = [
  "Low",
  "Normal",
  "High",
];

@Table({
  tableName: "Tasks",
  modelName: "TaskModel",
})
class TaskModel extends Model {
  @Default(UUIDV4())
  @PrimaryKey
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  fileAttachment!: string;

  @AllowNull(false)
  @Default("Normal")
  @Column(DataType.ENUM({ values: priorityTypes }))
  priority!: string;

  @Column(DataType.DATE)
  startDate!: Date;

  @Column(DataType.DATE)
  endDate!: Date;

  @CreatedAt
  @Default(Sequelize.fn("NOW"))
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Default(Sequelize.fn("NOW"))
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BelongsToMany(() => UserModel, () => UserTask)
  assignees!: UserModel[];
}

export default TaskModel;
