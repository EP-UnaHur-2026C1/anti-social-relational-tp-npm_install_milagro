'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.User, {
        through: models.Follows,
        foreignKey: "following_user_nickname",
        otherKey: "followed_user_nickname",
        as: "followings"
      })
      User.belongsToMany(models.User, {
        through: models.Follows,
        foreignKey: "followed_user_nickname",
        otherKey: "following_user_nickname",
        as: "followers"
      })
    }
  }
    User.init({
    nickname: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
