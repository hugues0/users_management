import { Transaction, where } from "sequelize";
import sequelize from "../configs/database";
import { TaskModel, UserModel, UserTask } from "../database/models";
import { CreateTask, Task } from "../types/Dtos/task.dto";

class TaskService {
  async create(newTask: CreateTask): Promise<Task> {
    const { assignees, ...rest } = newTask;
    const task = await sequelize.transaction(async (t) => {
      const createdTask = (await TaskModel.create(rest, {
        transaction: t,
      })) as unknown as Task;

      const promises = assignees.map((userId) =>
        UserTask.create({ taskId: createdTask.id, userId }, { transaction: t })
      );

      await Promise.all(promises);
      return createdTask;
    });

    return task as Task;
  }

  async getAll(): Promise<Task[]> {
    return sequelize.transaction(
      async (t) => TaskModel.findAll({ transaction: t }) as unknown as Task[]
    );
  }

  async getById(id: string): Promise<Task | undefined> {
    return sequelize.transaction(
      async (t) =>
        TaskModel.findByPk(id, {
          transaction: t,
          include: UserModel
        }) as unknown as Task
    );
  }

  async delete(id: string): Promise<void> {
    sequelize.transaction(async (t) =>
      TaskModel.destroy({ where: { id }, transaction: t })
    );
  }

  async update(id: string, updatedUser: any): Promise<Task> {
    return sequelize
      .transaction(
        async (t) =>
          TaskModel.update(updatedUser, {
            where: { id },
            transaction: t,
            returning: true,
          }) as unknown as Task
      )
      .then(
        () =>
          TaskModel.findOne({
            where: { id },
            attributes: ["id", "title", "description", "startedAt", "endedAt"],
          }) as unknown as Task
      );
  }
}

export default new TaskService();
