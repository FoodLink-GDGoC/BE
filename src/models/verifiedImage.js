const Sequelize = require('sequelize');

module.exports = class VerifiedImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      verifiedImageId: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      imageUrl: { type: Sequelize.STRING, allowNull: false },
      storeId: { type: Sequelize.BIGINT, allowNull: false },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'VerifiedImage',
      tableName: 'verified_image',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.VerifiedImage.belongsTo(db.Store, { foreignKey: 'storeId', as: 'store' });
  }
};