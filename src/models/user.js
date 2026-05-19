const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      nickname: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      point: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      paranoid: false,
      createdAt: 'createdAt',
      updatedAt: false,
      modelName: 'User',
      tableName: 'user',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Reservation, { foreignKey: 'userId', as: 'reservations' });
  }
};