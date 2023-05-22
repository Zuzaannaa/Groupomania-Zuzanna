'use strict';
const {	Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Like extends Model {
		static associate(models) {
			Like.belongsTo(models.User, {
				onDelete: 'cascade',
				foreignKey: { name: 'userId', allowNull: false },
				hooks: true });
			Like.belongsTo(models.Post, {
				onDelete: 'cascade',
				foreignKey: { name: 'postId', allowNull: false },
				hooks: true });
		}
	};
	Like.init({
		like: DataTypes.BOOLEAN
	}, {
		sequelize,
		modelName: 'Like',
	});
	return Like;
};