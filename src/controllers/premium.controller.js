const { error } = require("../utils/response")

class PremiumController {

    showPremiumContent = async (req, res, next) => {
        try {
            res.json("premium content");
        }catch(e){
            next(e)
        }

    }
}

module.exports = new PremiumController();