'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WebhookEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WebhookEvent.init({
    event: DataTypes.STRING,
    payload: DataTypes.JSON,
    recieved_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'WebhookEvent',
    tableName:"webhook_events"
  });
  return WebhookEvent;
};