'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {

     underscored: true,
     timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // User.hasMany(models.burgers, {
        //   hooks: true,
        //   foreignKey: {
        //     allowNull: false
        //   }
        // });

      }
    }
  });
  return User;
};