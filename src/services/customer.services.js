const paystackApi  = require("../utils/paystack");


class CustomerService {
    constructor() {
        this.paystackApi = paystackApi;
    }
    async createCustomer(user) {
        try {
            const response = await this.paystackApi.makeRequest(
                "POST",
                "/customer",
                {
                    first_name : user.firstname,
                    last_name : user.lastname,
                    email : user.email
                }
            );
            return response
        }catch(e){
            throw e;
        }
    }
}

module.exports = CustomerService;