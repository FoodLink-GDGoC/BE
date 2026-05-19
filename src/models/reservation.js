const Sequelize = require('sequelize');

module.exports = class Reservation extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      reservationId: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      status: { type: Sequelize.ENUM('CONFIRMED', 'PICKUP', 'NOSHOW', 'CANCEL', 'EXPIRED'), allowNull: false, defaultValue: 'CONFIRMED' },
      pickedUpAt: { type: Sequelize.DATE },
      userId: { type: Sequelize.BIGINT, allowNull: false },
      itemId: { type: Sequelize.BIGINT, allowNull: false },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      paranoid: false,
      createdAt: 'createdAt',
      updatedAt: false,
      modelName: 'Reservation',
      tableName: 'reservation',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Reservation.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
    db.Reservation.belongsTo(db.Item, { foreignKey: 'itemId', as: 'item' });
  }
};