import express from "express"
import adminControllers from "../controller/adminController.js"
import protect from "../middleware/authMiddleware.js"

let router = express.Router()

//Get Users
router.get('/users' , protect.forAdmin , adminControllers.getUsers)

//update Users
router.put("/users/:uid" , protect.forAdmin , adminControllers.updateUser )

//get AllOrders
router.get("/orders" , protect.forAdmin , adminControllers.getAllOrders )


//get all shops
router.get("/shops" , protect.forAdmin , adminControllers.getAllShops )


//update shop
router.put("/shops/:sid" , protect.forAdmin , adminControllers.updateShop )
 





export default router

