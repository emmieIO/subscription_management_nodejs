const {Plan} = require("../models");

class PlanService {

    async getPlansByPlanCode(plan_code){
        console.log("plan_code:",plan_code);
        
        try{
        // Get plans by plan code
        const plan = await Plan.findOne({where:{plan_code}})
        if(!plan){
            throw new Error("Plan not found")
        }
        return plan
        }catch(e){
            throw e
        }
    }

}

module.exports = PlanService;