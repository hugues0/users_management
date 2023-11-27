"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserTasks", {
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      taskId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usertasks");
  },
};
