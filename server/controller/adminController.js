import mongoose from "mongoose";
import Order from "../models/orderModel.js"
import User from "../models/userModal.js"
import Shop from "../models/shopModel.js";

let getUsers = async (req, res) => {
    let users = await User.find()

    if (!users) {
        res.status(404)
        throw new Error("Users Not Found");


    }else{
        res.status(200)
        res.json(users)
    }

}


let getAllOrders = async(req , res) =>{
    let allOrders = await Order.find().populate("user").populate("products.product").populate("coupon").populate("shop")

    if(!allOrders){
        res.status(404)
        throw new Error("Orders Not Found");
        
    }

    res.status(200).json(allOrders)

} 
  

let updateUser = async(req , res)=>{
    // if(!req.body.isActive){
    //     res.status(409)
    //     throw new Error("Please Send Status Of User");
        
    // }
    let updatedUser = await User.findByIdAndUpdate(req.params.uid , {isActive : req.body.isActive ? true : false} , {new : true})
    if(!updatedUser){
        res.status(409)
        throw new Error("User Not Updated");

    }
    res.status(200).json(updatedUser)

}

let getAllShops = async(req , res) =>{
    let shops = await Shop.find().populate("user")

    if(!shops){
        res.status(404)
        throw new Error("Shops Not Found");
        
    }

    res.status(200).json(shops)

}





let updateShop = async(req , res) =>{

    if(!req.body.status){
        res.status(409)
        throw new Error("Please Tell The Status"); 
    }

    let shopId = req.params.sid
    let updatedShop = await Shop.findByIdAndUpdate(shopId , {status:req.body.status} , {new : true}).populate('user')
    console.log(updateShop)
    if(!updatedShop){
        res.status(409)
        throw new Error("Shop cannot be activated");
    }

    if (req.body.status === "accepted") {
      await User.findByIdAndUpdate(updatedShop.user._id,{isShopowner:true},{new:true})
    }
    res.status(200).json(updatedShop)
}





let adminControllers = { getUsers ,  getAllOrders ,  updateUser , updateShop , getAllShops}


export default adminControllers