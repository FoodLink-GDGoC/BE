const Sequelize = require('sequelize');

module.exports = class Store extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      storeId: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      storeName: { type: Sequelize.STRING, allowNull: false },
      ownerName: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING, allowNull: false },
      lat: { type: Sequelize.FLOAT },
      lng: { type: Sequelize.FLOAT },
      is_verified: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      storeNumber: { type: Sequelize.STRING, allowNull: false },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      paranoid: false,
      createdAt: 'createdAt',
      updatedAt: false,
      modelName: 'Store',
      tableName: 'store',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Store.hasMany(db.Item, { foreignKey: 'storeId', as: 'items' });
    db.Store.hasMany(db.VerifiedImage, { foreignKey: 'storeId', as: 'verifiedImages' });
  }
};