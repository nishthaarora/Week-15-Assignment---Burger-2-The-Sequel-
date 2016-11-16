'use strict';

module.exports = function(sequelize, DataTypes) {
  var burgers = sequelize.define('burgers', {
    burger_name: DataTypes.STRING,
    devoured: DataTypes.BOOLEAN,
    date: DataTypes.DATE
  }, {

       underscored: true,
       timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // burgers.belongsTo(models.User, {
        //   foreignKey: {
        //     allowNull: false
        //   }
        // })

      }
    }
  });
  return burgers;
};