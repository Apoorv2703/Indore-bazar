import express from "express"
import protect from "../middleware/authMiddleware.js"
import cartController from "../controller/cartController.js"

let router = express.Router()

router.get("/" , protect.forAuthusers , cartController.getCart)

router.post("/" , protect.forAuthusers , cartController.addToCart)

router.put("/:cid" , protect.forAuthusers , cartController.updateCart)

router.delete("/:productId" , protect.forAuthusers , cartController.removeCart)

router.post("/clear" , protect.forAuthusers , cartController.clearCart)


export default router