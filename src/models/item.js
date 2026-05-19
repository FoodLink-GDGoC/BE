const Sequelize = require('sequelize');

module.exports = class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      itemId: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      price: { type: Sequelize.INTEGER, allowNull: false },
      type: { type: Sequelize.ENUM('GIVE', 'SELL'), allowNull: false },
      pickup_start: { type: Sequelize.STRING, allowNull: false },
      pickup_end: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.ENUM('ACTIVE', 'RESERVED', 'DONE', 'EXPIRED'), allowNull: false, defaultValue: 'ACTIVE' },
      storeId: { type: Sequelize.BIGINT, allowNull: false },
      image: { type: Sequelize.STRING },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      paranoid: false,
      createdAt: 'createdAt',
      updatedAt: false,
      modelName: 'Item',
      tableName: 'Item',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Item.belongsTo(db.Store, { foreignKey: 'storeId', as: 'store' });
    db.Item.hasMany(db.Reservation, { foreignKey: 'itemId', as: 'reservations' });
  }
};