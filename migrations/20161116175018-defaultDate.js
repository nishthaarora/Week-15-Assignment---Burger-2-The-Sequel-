'use strict';

var models = require('../models');
module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

     return queryInterface.changeColumn(
      'burgers',
      'date', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    )

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
     return queryInterface.removeColumn('burgers','date')
  }
};
