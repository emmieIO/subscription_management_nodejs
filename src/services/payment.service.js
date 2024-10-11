const paystackApi = require("../utils/paystack");

class PaymentService {
    constructor() {
        this.paystackApi = paystackApi;
        }
    async createPaymentPlan(data){
        try{
            const create_plan = await this.paystackApi.makeRequest(
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
            const subscribe = await this.paystackApi.makeRequest("POST", "/subscription",data);
            return subscribe
        }catch(e){
            throw e;
        }

    }
}

module.exports = new PaymentService();