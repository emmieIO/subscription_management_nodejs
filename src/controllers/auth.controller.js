const registerValidator = require("../utils/validators/register.validator.js");
const AuthService = require("../services/auth.services.js");
const { success } = require("../utils/response.js");
const apiError = require("../utils/apiError.js");

class Authenthication {

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await AuthService.authenticate({email, password})
            return success(res, user, "Login Success")
        } catch (error) {
            next(error);
        }
    }

    async register(req, res, next) {
        try {
            const user = await AuthService.createUser(req.body)
            return success(res, user,"user registration successful", 201);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new Authenthication();