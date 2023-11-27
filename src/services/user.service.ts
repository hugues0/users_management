import { Transaction, where } from "sequelize";
import sequelize from "../configs/database";
import {
  CreateUser,
  //UpdateUser,
  User,
} from "../types/Dtos/user.dto";
import TaskModel from "../database/models/Task";
import UserModel from "../database/models/User";

class UserService {
  async create(newUser: CreateUser): Promise<User> {
    return sequelize.transaction(
      async (t) =>
        UserModel.create(newUser, {
          transaction: t,
          include: [TaskModel],
        }) as unknown as User
    );
  }

  async getAll(): Promise<User[]> {
    return sequelize.transaction(
      async (t) => UserModel.findAll({ transaction: t }) as unknown as User[]
    );
  }

  async getById(id: string): Promise<User | undefined> {
    return sequelize.transaction(
      async (t) =>
        UserModel.findByPk(id, {
          transaction: t,
        }) as unknown as User
    );
  }

  async update(id: string, updatedUser: any): Promise<User> {
    return sequelize
      .transaction(
        async (t) =>
          UserModel.update(updatedUser, {
            where: { id },
            transaction: t,
            returning: true,
          }) as unknown as User
      )
      .then(
        () =>
          UserModel.findOne({
            where: { id },
            attributes: ["id", "firstName", "lastName", "email"],
          }) as unknown as User
      );
  }

  async updateByEmail(email: string, updateUser: any): Promise<User> {
    return sequelize
      .transaction(
        async (t) =>
          UserModel.update(updateUser, {
            where: { email },
            transaction: t,
          }) as unknown as User
      )
      .then(
        () =>
          UserModel.findOne({
            where: { email },
            attributes: ["id", "firstName", "lastName", "email", "provider"],
          }) as unknown as User
      );
  }

  async delete(id: string): Promise<void> {
    sequelize.transaction(async (t) =>
      UserModel.destroy({ where: { id }, transaction: t })
    );
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return sequelize.transaction(
      async (t) =>
        UserModel.findOne({
          where: { email },
          transaction: t,
        }) as unknown as User
    );
  }



//   async changePassword(
//     password: string,
//     userId: string
//   ): Promise<changedPassordResponse | undefined> {
//     return sequelize.transaction(
//       async (t) =>
//         UserModel.update(
//           { password },
//           { where: { id: userId }, transaction: t }
//         ) as unknown as changedPassordResponse
//     );
//   }

//   async setPassword(
//     password: string,
//     userId: string
//   ): Promise<changedPassordResponse | undefined> {
//     return sequelize.transaction(
//       async (t) =>
//         UserModel.update(
//           { password, provider: null, profileId: null },
//           { where: { id: userId }, transaction: t }
//         ) as unknown as changedPassordResponse
//     );
//   }
}

export default new UserService();
