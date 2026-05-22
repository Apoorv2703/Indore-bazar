import { CANCELLED } from "node:dns";
import uploadToCloudinary from "../middleware/cloudinaryMiddleWare.js";
import Coupon from "../models/couponModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Shop from "../models/shopModel.js";
import fs from "node:fs"
import { log } from "node:console";


let getShop = async(req , res)=>{

    let userId = req.user._id

    let shop = await Shop.findOne({user : userId})

    if(!shop){
        res.status(404)
        throw new Error("Shop Not Found");
        

    }

    res.status(200).json(shop)

}

let addShops = async(req , res)=>{
    let {name , description , address , shopPhone} = req.body
    console.log(req.body)
    let user = req.user.id 

    if(!name || !description || !address || !shopPhone){
        res.status(409)
        throw new Error("Please Fill All Details");   
    }

    let shop = await (await Shop.create({name , description , address , shopPhone , user})).populate('user')

    if(!shop){
        res.status(401)
        throw new Error("Shop Not Created");   
    }

    res.status(201).json({
        message : "Req has been sent to Admin" ,
        shop
    })

}

let updateShop = async(req ,res)=>{
    
   let shopId = req.params.sid

  if( req.body.status){
     req.body.status = "pending"
  }

    let updateShop = await Shop.findByIdAndUpdate(shopId , req.body , {new : true})

    if(!updateShop){
        res.status(409)
        throw new Error("Shop Not Updated");
        

    }

    res.status(200).json(updateShop)

}

let addProduct = async(req , res)=>{
    let {name , description , price , stock , category , shopId } = req.body

    if(!name || !description || !price || !stock || !category){
        res.status(409)
        throw new Error("Please Fill All Details");
    }

    //upload file to cloudinary
    let uploadResponse = await uploadToCloudinary(req.file.path)

    //remove file from server

    fs.unlinkSync(req.file.path)
    

    let product = new Product({
        name , description , price , stock , category , productImage : uploadResponse.secure_url , shop : shopId
    })

    await product.save()

    await product.populate("shop")

    if(!product){
        res.status(409)
        throw new Error("Product Not Created");
        
    }

    res.status(201).json(product)
    
}

let updateProduct = async(req , res)=>{
    let updatedProduct = await Product.findByIdAndUpdate(req.params.pid , req.body , {new : true}).populate("shop")

    //todo : image updation pending

    if(!updatedProduct){
        res.status(409)
        throw new Error("Product Not Updated");
    }

    res.status(200).json(updatedProduct)
}

let createCoupon = async (req , res)=>{

    let userId = req.user._id
    let {couponCode , couponDiscount} = req.body

    if(!couponCode || !couponDiscount){
        res.status(409)
        throw new Error("Please Enter All Fields");
        
    }
//Find My shop
    let shop = await Shop.findOne({user : userId})

    let coupon = new Coupon({
        couponCode : couponCode.toUpperCase() ,
        couponDiscount,
        shop : shop._id
    })

    await coupon.save()

    // await coupon.populate("shop")

    if(!coupon){
        res.status(409)
        throw new Error("Coupon Not Created");
        
    }

    res.status(201).json(coupon)
    

    res.send("coupon created")
}

let getMyShopOrders = async(req , res)=>{

    let userId = req.user._id 

    let shop = await Shop.findOne({user : userId})

    if(!shop){
        res.status(404)
        throw new Error("Shop Not Found");
        
    }

    let myallOrders = await Order.find({shop : shop._id}).populate("user").populate("products.product").populate("coupon")

    if(!myallOrders){
        res.status(404)
        throw new Error("Orders Not Found");
        
        
    }

   
    
    res.status(200).json(myallOrders)

}

const updateOrder = async (req, res) => {

    let orderId = req.params.oid

    let order = await Order.findById(orderId).populate("products.product")

    let { status } = req.body

    if (!status) {
        res.status(409)
        throw new Error("Status Not Founs!")

    }
     let updateStock = async(productId , stock) =>{
        await Product.findByIdAndUpdate(productId , {stock : stock} , {new : true})
            
        }


let updatedOrder 
//if cancelled
    if(status === "Cancelled"){

    updatedOrder = await Order.findByIdAndUpdate(req.params.oid, { status: "Cancelled" }, { new: true }).populate("user").populate("products").populate("coupon").populate("shop")
//if Dispatched
    }else if(status === "Dispatched") {
        //updating stock
       order.products.forEach((product)=>{
        let productId = product.product._id
        let productQty = product.qty 
        let currentStock = product.product.stock
        updateStock(productId , currentStock - productQty)
        
       })

       updatedOrder = await Order.findByIdAndUpdate(req.params.oid, { status: "Dispatched" }, { new: true }).populate("user").populate("products").populate("coupon").populate("shop")
        

    }else{
         updatedOrder = await Order.findByIdAndUpdate(req.params.oid, { status: "Delivered"  }, { new: true }).populate("user").populate("products").populate("coupon").populate("shop")

    }


    if (!updatedOrder) {
        res.status(401)
        throw new Error("Order Not Updated")
    }

    res.status(200).json(updatedOrder)

    


}


let shopOwnerController = {addShops , updateShop , addProduct , updateProduct , updateOrder , createCoupon , getMyShopOrders , getShop}

export default shopOwnerController