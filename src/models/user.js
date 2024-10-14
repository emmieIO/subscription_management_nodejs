'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, {
        through: 'UserRoles',
        foreignKey: 'userId',
        as: 'roles'
      })
    }

    async assignRole(role_name, options = {}) {
      // roles look up
      const role = await sequelize.models.Role.findOne({
        where: {
          role_name: role_name
        },
        transaction: options.transaction
      });
      // Check if role lookup was successful
      if (!role) {
        throw new Error('Role not found');
      }
      // Check if user has role exists
      const existingRole = await sequelize.models.UserRoles.findOne({
        where: {
          userId: this.id,
        },
        transaction: options.transaction
      });


      if (existingRole) {
        existingRole.roleId = role.id
        await existingRole.save({ transaction: options.transaction });
        return true;
      }
      // Before assigning new role
      await sequelize.models.UserRoles.create({
        userId: this.id,
        roleId: role.id,
      }, { transaction: options.transaction });
      return true;
    }

    async hasRole(role_name) {
      const role = await sequelize.models.Role.findOne({
        where: { role_name: role_name }
      });

      if (!role) {
        throw new Error('Role not found');
      }

      // Check if the user has this role
      const userRole = await sequelize.models.UserRoles.findOne({
        where: { userId: this.id, roleId: role.id }
      });

      return !!userRole; 
    }

    async role() {
      const userRole = await sequelize.models.UserRoles.findOne({
        where: { userId: this.id },
        include: [{
          model: sequelize.models.Role,
          attributes: ['role_name']
        }]
      });
      return userRole && userRole.Role ? userRole.Role.role_name : null;
    }

    async removeRole(role_name) {
      // check user current role
      const userRole = await this.sequelize.UserRoles.findOne(
        {
          where: {
            userId: this.id
          },
          include: [
            {
              model: sequelize.models.Role,
              attributes: ['role_name']
            }
          ]
        });
      if (!userRole) {
        throw new Error('User has no role assigned')
      }
      // check if role match the role_name
      if (userRole.Role.role_name !== role_name) {
        throw new Error(`Role mismatch: expected ${role_name}, found ${userRole.Role.role_name}`)
      }
      // remove user role
      await userRole.destroy()
    }

  }
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    customer_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};