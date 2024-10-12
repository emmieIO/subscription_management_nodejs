'use strict';
const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role,{
        through: 'UserRoles',
        foreignKey: 'userId',
        as:'roles'
      })
    }

    async assignRole(role_name, options={}) {
      // roles look up
      const role = await sequelize.models.Role.findOne({ where: {
        role_name: role_name
      },
      transaction : options.transaction
    });
       // Check if role lookup was successful
      if (!role) {
        console.error(`Role ${role_name} not found`);
        throw new Error('Role not found');
      }
       // Check if user has role exists
      const existingRole = await sequelize.models.UserRoles.findOne({
        where: {
          userId: this.id,
          roleId: role.id,
        },
        transaction: options.transaction
      });
      console.log("an existing role", existingRole);
      
      if (existingRole) {
        console.log("Role already assigned");
        return;
      }
       // Before assigning new role

      const newRole = await sequelize.models.UserRoles.create({
        userId: this.id,
        roleId: role.id,
      },{ transaction: options.transaction });

      console.log("role assigned");
      
    }

    async hasRole(role_name){
      const role = await this.sequelize.Role.findOne({where:{name:role_name}})
      if(!role){
        throw new Error('Role not found')
      }
      const userRole = await this.sequelize.UserRole.findOne({
        where:{
        userId:this.id,
        roleId:role.id
      }
      })
      return userRole ? true : false;
    }

    async role(){
      const userRole = await sequelize.models.UserRoles.findOne({
        where:{userId:this.id},
        include:[{
          model:sequelize.models.Role,
          attributes:['role_name']
        }]
      });
      return userRole && userRole.Role ? userRole.Role.role_name : null;
    }

  }
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    customer_id:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};