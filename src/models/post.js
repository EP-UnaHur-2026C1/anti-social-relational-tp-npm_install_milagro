'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "user_nickname",
        as: "user"
      })
      Post.belongsToMany(models.Tag, {
        through: models.Tag_Post,
        foreignKey: "post_id",
        otherKey: "tag_id",
        as: "tags"
      })
    }
  }
  Post.init({
    user_nickname: DataTypes.STRING,
    text: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};