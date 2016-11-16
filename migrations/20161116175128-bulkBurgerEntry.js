'use strict';

var burgers = require('../models')['burgers'];

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
        return burgers.bulkCreate([
    {
      burger_name: "chicken burger"
    }, {
      burger_name: "beef burger"
    }, {
      burger_name: "veggie burger"
    }, {
      burger_name: "fish burger"
    }, {
      burger_name: "salmon burger"
    }, {
      burger_name: "black bean burger"
    }]

  )

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
        return burgers.destroy({
      where: {
        burger_name: [
          "chicken burger",
          "beef burger",
          "veggie burger",
          "fish burger",
          "salmon burger",
          "black bean burger"
        ]
      }
  })
}
}
