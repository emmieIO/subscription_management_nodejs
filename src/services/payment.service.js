const paystackApi = require("../utils/paystack");

class PaymentService {
    constructor() {
        this.paymentGateway = paystackApi;
        }
    async createPaymentPlan(data){
        try{
            const create_plan = await this.paymentGateway.makeRequest(
                "post",
                "/plan",
                data
            )
            return create_plan
        }catch(e){
            throw e;
        }
    }

    async subscribe(data){
        try{
            const subscription = await this.paymentGateway.makeRequest(
                "post",
                "/subscription",
                data
            )
            return subscription
        }catch(e){
            throw e;
        }
    }


}

module.exports = PaymentService;