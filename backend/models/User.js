'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.hasMany(models.Post, {
				onDelete: 'cascade',
				foreignKey: { name: 'userId', allowNull: false },
				hooks: true });
			User.hasMany(models.Comment, {
				onDelete: 'cascade',
				foreignKey: { name: 'userId', allowNull: false },
				hooks: true });
			User.hasMany(models.Like, {
				onDelete: 'cascade',
				foreignKey: { name: 'userId', allowNull: false },
				hooks: true });
		}
	};
	User.init({
		email: { type: DataTypes.STRING, allowNull: false, unique: true },
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		password: DataTypes.STRING,
		profile: { type: DataTypes.STRING, defaultValue: 'defaultUserProfile.png' },
		isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};