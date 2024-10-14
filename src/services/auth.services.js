const { User, Role, sequelize } = require("../models/");
const bcryptjs = require("bcryptjs");
const apiError = require("../utils/apiError.js");
const { generateToken } = require("../utils/tokens.js");
const customerProcessQueue = require("../jobs/processCustomerqueue.js");


class AuthService {

    async createUser(data) {
        const transaction = await sequelize.transaction()
        try {
            const { firstname, lastname, email, password } = data;
            const hashedPassword = bcryptjs.hashSync(password, 10);
            const user = await User.create({ firstname, lastname, email, password: hashedPassword }, {
                transaction
            });
            await user.assignRole('free_user', { transaction });
            await transaction.commit();
            customerProcessQueue.add({id:user.id})
            return user;
        } catch (error) {
            await transaction.rollback();
            throw error
        }
    }
    async authenticate(credentials) {
        try {
            const { email, password } = credentials;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw apiError("Invalid login credentials", 403)
            }
            // check passwords
            const isMatch = await bcryptjs.compare(password, user.password)
            if (!isMatch) {
                throw apiError("Invalid login credentials", 403)
            }

            // generate token
            const token = generateToken({
                userId: user.id,
                role: await user.role()
            });
            return { user, token }
        } catch (error) {
            throw error
        }
    }

    async updateCustomerId(user, options={}){
        const customerResponse = await this.customerService.createCustomer(user)
            user.customer_id = customerResponse.data.customer_code;
            await user.save({ transaction:options.transaction });
    }

}

module.exports = new  AuthService();
