import express from "express"
import protect from "../middleware/authMiddleware.js"
// import cartController from "../controller/cartController.js"
import orderController from "../controller/orderController.js"

let router = express.Router()

router.get("/" , protect.forAuthusers , orderController.getMyOrders)
router.get("/:oid" , protect.forAuthusers , orderController.getMyOrder)
router.post("/" , protect.forAuthusers , orderController.createOrder)
router.put("/:oid" , protect.forAuthusers , orderController.cancleOrder)


export default router