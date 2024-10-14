'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subscription.init({
    user_id: DataTypes.INTEGER,
    plan_id: DataTypes.INTEGER,
    paystack_id: DataTypes.STRING,
    status: DataTypes.STRING,
    start_date: DataTypes.DATE,
    next_billing_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};