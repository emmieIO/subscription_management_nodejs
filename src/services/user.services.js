const subscriptionService = require("../services/subscription.services")
class UserService {
    constructor() {
        this.subscriptionService = subscriptionService
    }

    async upgradeUser(data){
        const initializePayment = subscriptionService.subscribe();
        return initializePayment;
    }

}