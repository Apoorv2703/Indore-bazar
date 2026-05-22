import express from "express"
import productController from "../controller/productController.js"
import reviewRoutes from "../Routes/reviewRoutes.js"

let router = express.Router({mergeParams : true})


router.get("/" , productController.getProducts)

router.get("/:pid" , productController.getProduct)

router.get("/search/:query" , productController.searchProduct)

let addProductMiddleWare = (req , res , next)=>{
    //add to request object
    req.pid = req.params.pid
    next()
    
}

router.use("/:pid/review/" , addProductMiddleWare , reviewRoutes )

export default router