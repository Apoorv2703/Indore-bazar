import express from "express"
import couponController from "../controller/couponController.js"

let router = express.Router()

//getCoupons

router.get("/:sid" , couponController.getCoupons)


router.post("/apply" , couponController.applyCoupon)

export default router
