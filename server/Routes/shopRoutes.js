import express from "express"
import shopController from "../controller/shopController.js"

let router = express.Router()

router.get("/" , shopController.getShops)

router.get("/:sid" , shopController.getShop)

export default router