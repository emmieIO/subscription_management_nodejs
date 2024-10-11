const express = require('express')
const router = express.Router()
const PlanController = require("../../controllers/plan.controller.js")

router.post("/",PlanController.createPlan)

module.exports = router;