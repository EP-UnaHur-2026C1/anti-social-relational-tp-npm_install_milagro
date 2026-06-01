'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "user_nickname",
        as: "user"
      })
      Comment.belongsTo(models.Post, {
        foreignKey: "post_id",
        as: "post"
      })
    }
  }
  Comment.init({
    text: DataTypes.STRING,
    is_visible: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};