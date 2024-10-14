const subscriptionService = require("../services/subscription.services")
const {User} = require("../models")
const apiError = require("../utils/apiError")
class UserService {
    constructor() {
        this.subscriptionService = subscriptionService
    }

    async upgradeUser(data){
        const initializePayment = subscriptionService.subscribe();
        return initializePayment;
    }

    async getAuthenticatedUser(id){
        try{
            const user = await User.findByPk(id);
            if(!user) apiError("User not found.", 404);
            return user;
        }catch(e){
            throw e
        }
    }

}

module.exports = UserService;
