import mongoose from "mongoose";

let couponSchema = new mongoose.Schema({

    couponCode : {
        type : String,
        required : [true , "Please Enter Valid Coupon Code"]
    },
    couponDiscount : {
        type :Number ,
        required : [true , "Please Enter Rate Of Discount"]
    },
    isActive : {
        type : Boolean ,
        required : true ,
        default : true 
    },
    shop : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Shop",
        required : true

    }

},{
    timestamps : true
})

let Coupon = mongoose.model("Coupon" , couponSchema)

export default Coupon