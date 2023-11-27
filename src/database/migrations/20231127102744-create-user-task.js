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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usertasks");
  },
};
