'use strict';
const {	Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate(models) {
			Post.belongsTo(models.User, {
				onDelete: 'cascade',
				foreignKey: { name: 'userId', allowNull: false },
				hooks: true });
			Post.hasMany(models.Comment, {
				onDelete: 'cascade',
				foreignKey: { name: 'postId', allowNull: false },
				hooks: true });
			Post.hasMany(models.Like, {
				onDelete: 'cascade',
				foreignKey: { name: 'postId', allowNull: false },
				hooks: true });
		}
	};
	Post.init({
		text: DataTypes.STRING,
		file: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Post',
	});
	return Post;
};