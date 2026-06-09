'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follows.belongsTo(models.User, {
        foreignKey: "following_user_nickname",
        as: "followerUser"
      });

      Follows.belongsTo(models.User, {
        foreignKey: "followed_user_nickname",
        as: "followedUser"
      });
    }
  }
  Follows.init({
    following_user_nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    followed_user_nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
  ,{
    sequelize,
    modelName: 'Follows',
  });
  return Follows;
};