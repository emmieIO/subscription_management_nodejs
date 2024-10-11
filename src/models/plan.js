'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Plan.init({
    name: DataTypes.STRING,
    interval:{
      type:DataTypes.ENUM,
      values: ['monthly', 'biannually', 'annually'],
    },
    amount: DataTypes.INTEGER,
    plan_code:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};