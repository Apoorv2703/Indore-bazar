import express from "express"
import shopOwnerController from "../controller/shopOwnerController.js"
import protect from "../middleware/authMiddleware.js"
import upload from "../middleware/fileUploadMiddleware.js"

let router = express.Router()

//get shops
router.get("/" , protect.forAuthusers , shopOwnerController.getShop)


//create shops
router.post("/create-shop" , protect.forAuthusers , shopOwnerController.addShops)



//Add product
router.post("/add-product" , protect.forAuthusers , upload.single("productImage"), shopOwnerController.addProduct)


//shop orders
router.get("/order/" , protect.forAuthusers , shopOwnerController.getMyShopOrders)


//update order
router.put("/order/:oid" , protect.forAuthusers , shopOwnerController.updateOrder)


//update product
router.put("/product/:pid" , protect.forAuthusers , shopOwnerController.updateProduct)


//update shop
router.put("/shop/:sid" , protect.forAuthusers , shopOwnerController.updateShop)

//create Coupon
router.post("/coupon" , protect.forAuthusers , shopOwnerController.createCoupon)

export default router